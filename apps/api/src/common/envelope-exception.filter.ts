import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  defaultErrorMessages,
  failure,
  type ApiErrorBody,
  type ErrorCode,
} from '@kibo/contracts';
import type { Response } from 'express';

import { ApiException } from './api-exception';

// Field validation always arrives as an ApiException; a bare 400 is a bad request
const codeByStatus: Partial<Record<number, ErrorCode>> = {
  [HttpStatus.UNAUTHORIZED]: 'UNAUTHENTICATED',
  [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
};

/** Nest's own messages can be an array or an object; keep one sentence. */
function messageOf(exception: HttpException, code: ErrorCode) {
  // The router's 404 says “Cannot GET /path”; people should read the default
  if (code === 'NOT_FOUND') return defaultErrorMessages.NOT_FOUND;
  const response = exception.getResponse();
  const message =
    typeof response === 'string'
      ? response
      : (response as { message?: unknown }).message;
  if (typeof message !== 'string') return defaultErrorMessages[code];
  // express.json() reports parse errors like “Unexpected end of JSON input”
  return /JSON/.test(message) ? 'The request body isn’t valid JSON.' : message;
}

/**
 * Turns every error into `{ status: "failed", result: null, error }` and
 * keeps a meaningful HTTP status. Unexpected errors are logged and answered
 * with a generic 500, never a stack trace.
 */
@Catch()
export class EnvelopeExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Api');

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const { status, error } = this.toError(exception);

    response.status(status).json(failure(error));
  }

  private toError(exception: unknown): { status: number; error: ApiErrorBody } {
    if (exception instanceof ApiException) {
      return {
        status: exception.getStatus(),
        error: {
          code: exception.code,
          message: exception.message,
          details: exception.details,
        },
      };
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      if (status < 500) {
        const code = codeByStatus[status] ?? 'REQUEST_FAILED';
        return {
          status,
          error: { code, message: messageOf(exception, code), details: null },
        };
      }
    }

    this.logger.error(
      exception instanceof Error ? exception.stack : String(exception),
    );
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: {
        code: 'INTERNAL_ERROR',
        message: defaultErrorMessages.INTERNAL_ERROR,
        details: null,
      },
    };
  }
}
