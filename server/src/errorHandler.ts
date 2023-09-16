import { NextFunction, Response } from "express";

export const errorHandler = (
  error: Error,
  response: Response,
  next: NextFunction
) => {
  if (response.headersSent) {
    return next(error);
  }
  switch (error.message) {
    case "NameConflictError":
      return response
        .status(409)
        .send({ Error: "Name already exists" });
    case "EmailConflictError":
      return response
        .status(409)
        .send({ Error: "Email already exists" });
    case "UserNotFound":
      return response
        .status(404)
        .send({ Error: "Player(s) not found" });
    case "EmailNotExists":
      return response
        .status(401)
        .send({ Error: "Email doesn't exist" });
    case "AddingMessageError":
      return response
        .status(500).send({ Error: "Error playing game" });
    default:
      return response
        .status(500)
        .json({ error: error.message });
  }
};
