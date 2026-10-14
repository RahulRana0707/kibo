import { HttpException, HttpStatus } from '@nestjs/common';
import {
  defaultErrorMessages,
  type ApiErrorDetails,
  type ErrorCode,
} from '@kibo/contracts';

/**
 * The one exception services throw. The envelope filter turns it into
 * `{ status: "failed", result: null, error: { code, message, details } }`
 * with this HTTP status.
 */
export class ApiException extends HttpException {
  constructor(
    readonly code: ErrorCode,
    message: string = defaultErrorMessages[code],
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    readonly details: ApiErrorDetails | null = null,
  ) {
    super(message, status);
  }

  static notFound(code: ErrorCode = 'NOT_FOUND', message?: string) {
    return new ApiException(code, message, HttpStatus.NOT_FOUND);
  }

  static conflict(code: ErrorCode, message?: string) {
    return new ApiException(code, message, HttpStatus.CONFLICT);
  }
}
