class ResponseHandler {
  constructor({ message, status = 200, data = null, options = {} }) {
    this.message = message;
    this.status = status;
    this.data = data;
    this.options = options;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

export default ResponseHandler;
