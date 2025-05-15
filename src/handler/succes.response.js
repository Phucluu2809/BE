import ResponseHandler from './error-handler.js';

class SuccessResponse extends ResponseHandler {
  constructor({ 
    message = 'Success', 
    status = 200, 
    data = null,
    options = {}
  }) {
    super({ message, status, data, options });
    this.status = status;
  }

  static OK(data = null, message = 'Success', options = {}) {
    return new SuccessResponse({ 
      message, 
      status: 200, 
      data,
      options
    });
  }

  static Created(data = null, message = 'Created Successfully', options = {}) {
    return new SuccessResponse({ 
      message, 
      status: 201, 
      data,
      options
    });
  }

  send(res) {
    return super.send(res);
  }
}

export default SuccessResponse;
