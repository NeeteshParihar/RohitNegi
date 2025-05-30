// middleware/validateSchema.js

import { isInputValid } from "./verifyInput.js";

export function validateSchema(schema, message = "bad request") {
  return function (req, res, next) {
    const isValid = isInputValid(req.body, schema);
    if (isValid) {
      next();
    } else {
       res.status(400).send(message);
    }
  };
}
