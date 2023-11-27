import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorFilter<T> implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {

    let message = exception.message;
    let status = 500;
    switch (exception.code) {
      case 'P2000': // Request error
        status = 400;
        message = 'Request error';
        break;
      case 'P2001': // Record does not exist
        status = 404;
        message = 'Record does not exist';
        break;
      case 'P2002': // Unique constraint failed
        status = 409;
        message = 'Unique constraint failed';
        break;
      case 'P2003': // Foreign key constraint failed
        status = 400;
        message = 'Foreign key constraint failed';
        break;
      case 'P2004': // Constraint failed
        status = 400;
        message = 'Constraint failed';
        break;
      case 'P2005': // Value out of range for the type
        status = 400;
        message = 'Value out of range for the type';
        break;
      case 'P2006': // Division by zero
        status = 400;
        message = 'Division by zero';
        break;
      case 'P2007': // Missing the required argument
        status = 400;
        message = 'Missing the required argument';
        break;
      case 'P2008': // Invalid function argument
        status = 400;
        message = 'Invalid function argument';
        break;
      case 'P2009': // Null constraint violation
        status = 400;
        message = 'Null constraint violation';
        break;
      case 'P2010': // Missing item for the update
        status = 400;
        message = 'Missing item for the update';
        break;
      case 'P2011': // Invalid connection arguments
        status = 400;
        message = 'Invalid connection arguments';
        break;
      case 'P2012': // Missing a required value
        status = 400;
        message = 'Missing a required value';
        break;
      // More cases as needed...
      default:
        status = 500;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message: message,
    });

  }
}
