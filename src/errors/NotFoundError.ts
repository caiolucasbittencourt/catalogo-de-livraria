class NotFoundError extends Error {
  status: number;

  constructor(message = "PÃ¡gina nÃ£o encontrada") {
    super(message);
    this.status = 404;
  }
}

export default NotFoundError;
