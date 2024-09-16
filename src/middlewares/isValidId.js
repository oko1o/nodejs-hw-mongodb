import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(createHttpError(404, `${id} is not valid ID`));
  }
  next();
};

export default isValidId;
