import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { defaultErrorMessages } from '@kibo/contracts';
import type { ZodType } from 'zod';

import { ApiException } from '../api-exception';

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const issues = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));

      throw new ApiException(
        'VALIDATION_FAILED',
        // One problem reads better as itself than as “some fields need fixing”
        issues.length === 1 && issues[0]
          ? issues[0].message
          : defaultErrorMessages.VALIDATION_FAILED,
        HttpStatus.BAD_REQUEST,
        { issues },
      );
    }

    return result.data;
  }
}
