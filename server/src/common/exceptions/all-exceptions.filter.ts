import { ForbiddenError } from '@casl/ability';
import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception);

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus: number,
      message: string | undefined,
      meta: object = {};

    if (exception instanceof PrismaClientKnownRequestError) {
      const handler = this.handlePrismaError(exception);
      httpStatus = handler.httpStatus;
      message = handler.message;
    } else if (exception instanceof ForbiddenError) {
      httpStatus = HttpStatus.FORBIDDEN;
      message = 'You do not have permission to perform this action.';
    } else if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object') {
        meta = response;
      }
      this.logger.debug('Response: ', response);
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'An unexpected error occurred. Please try again later.';
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      message,
      ...meta,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  handlePrismaError(error: PrismaClientKnownRequestError) {
    let httpStatus: number, message: string | undefined;
    switch (error.code) {
      case 'P2000': // Value out of range
        httpStatus = HttpStatus.BAD_REQUEST;
        message = 'The provided value for one of the fields is out of range.';
        break;
      case 'P2002': // Unique constraint violation
        httpStatus = HttpStatus.BAD_REQUEST;
        message = 'A record with this unique field already exists.';
        break;
      case 'P2003': // Foreign key constraint violation
        httpStatus = HttpStatus.BAD_REQUEST;
        message = 'Invalid foreign key reference. Please check related data.';
        break;
      case 'P2004': {
        // Constraint failed
        httpStatus = HttpStatus.BAD_REQUEST;
        const meta = error.meta || {};
        if ('reason' in meta) {
          switch (meta.reason) {
            case 'ACCESS_POLICY_VIOLATION':
              httpStatus = HttpStatus.FORBIDDEN;
              message = 'You do not have permission to perform this action.';
              break;
            case 'RESULT_NOT_READABLE':
              httpStatus = HttpStatus.FORBIDDEN;
              message = 'You do not have permission to perform this action.';
              break;
            case 'DATA_VALIDATION_VIOLATION':
              message = 'The data provided is not valid.';
              break;
            default:
              message = 'A constraint failed. Please check the data provided.';
              break;
          }
        }
        break;
      }
      case 'P2011': // Null constraint violation
        httpStatus = HttpStatus.BAD_REQUEST;
        message =
          'A required field is missing. Please complete all required fields.';
        break;
      case 'P2021': // Table or view not found
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        message =
          'The database table or view was not found. Please contact support.';
        break;
      case 'P2022': // Column not found
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        message =
          'One of the columns required for this operation was not found. Please contact support.';
        break;
      case 'P2025': // Record not found
        httpStatus = HttpStatus.NOT_FOUND;
        message =
          'The record you are trying to update or delete was not found.';
        break;
      case 'P2026': // Connection timeout
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        message =
          'The connection to the database timed out. Please try again later.';
        break;
      case 'P2030': // Full-text index not found
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'A full-text index was not found for this operation.';
        break;
      default:
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'An unexpected error occurred. Please try again later.';
        break;
    }
    return { httpStatus, message };
  }
}
