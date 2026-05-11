class NotFoundError extends Error {
  constructor(message = "PÃ¡gina nÃ£o encontrada") {
    super(message);
    this.status = 404;
  }
}

export default NotFoundError;
