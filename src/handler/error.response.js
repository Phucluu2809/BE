import ResponseHandler from './error-handler.js';

class ErrorResponse extends ResponseHandler {
  constructor({ 
    message = 'Error', 
    status = 400,
    code = 'ERROR_UNDEFINED',
    errors = []
  }) {
    super({ message, status });
    this.code = code;
    this.errors = errors;
  }

  static BadRequest(message = 'Bad Request', errors = []) {
    return new ErrorResponse({
      message,
      status: 400,
      code: 'ERROR_BAD_REQUEST',
      errors
    });
  }

  static Unauthorized(message = 'Unauthorized', errors = []) {
    return new ErrorResponse({
      message,
      status: 401,
      code: 'ERROR_UNAUTHORIZED',
      errors
    });
  }

  static Forbidden(message = 'Forbidden', errors = []) {
    return new ErrorResponse({
      message,
      status: 403,
      code: 'ERROR_FORBIDDEN',
      errors
    });
  }

  static NotFound(message = 'Resource not found', errors = []) {
    return new ErrorResponse({
      message,
      status: 404,
      code: 'ERROR_NOT_FOUND',
      errors
    });
  }

  static Conflict(message = 'Conflict', errors = []) {
    return new ErrorResponse({
      message,
      status: 409,
      code: 'ERROR_CONFLICT',
      errors
    });
  }

  static InternalServer(message = 'Internal Server Error', errors = []) {
    return new ErrorResponse({
      message,
      status: 500,
      code: 'ERROR_INTERNAL_SERVER',
      errors
    });
  }

  send(res) {
    return super.send(res);
  }
}

export default ErrorResponse;
