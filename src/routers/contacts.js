import { Router } from 'express';

import * as contactControllers from '../controllers/contacts.js';

import isValidId from '../middlewares/isValidId.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  contactAddSchema,
  contactPatchSchema,
} from '../validation/contacts.js';

const contactRouter = Router();

contactRouter.get(
  '/',
  ctrlWrapper(contactControllers.getAllContactsController),
);
contactRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactControllers.getContactByIdController),
);

contactRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(contactControllers.addContactController),
);

contactRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactPatchSchema),
  ctrlWrapper(contactControllers.patchContactController),
);

contactRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactControllers.deleteContactController),
);

export default contactRouter;
