"use strict";

import reasonPhrases from "../utils/reasonPhrases.js";
import statusCodes from "../utils/statusCodes.js";

const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
};
const ReasonStatusCode = {
  FORBIDDEN: "Bad Request",
  CONFLICT: "Conflict error",
};

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}
class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.FORBIDDEN,
    statusCode = StatusCode.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = reasonPhrases.UNAUTHORIZED,
    statusCode = statusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}
class NotFoundError extends ErrorResponse {
  constructor(
    message = reasonPhrases.NOT_FOUND,
    statusCode = statusCodes.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

export { ConflictRequestError, BadRequestError, AuthFailureError,NotFoundError };
