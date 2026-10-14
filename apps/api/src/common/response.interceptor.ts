import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { success, type ApiSuccess } from '@kibo/contracts';
import { map, type Observable } from 'rxjs';

/** Wraps whatever a route returns in `{ status: "success", result, error: null }`. */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiSuccess<T | null>
> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiSuccess<T | null>> {
    return next.handle().pipe(map((result) => success(result ?? null)));
  }
}
