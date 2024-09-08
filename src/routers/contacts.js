import { Router } from 'express';
import * as contactControllers from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactRouter = Router();

contactRouter.get(
  '/',
  ctrlWrapper(contactControllers.getAllContactsController),
);
contactRouter.get(
  '/:contactId',
  ctrlWrapper(contactControllers.getContactByIdController),
);

contactRouter.post('/', ctrlWrapper(contactControllers.addContactController));

contactRouter.patch(
  '/:contactId',
  ctrlWrapper(contactControllers.patchContactController),
);

contactRouter.delete(
  '/:contactId',
  ctrlWrapper(contactControllers.deleteContactController),
);

export default contactRouter;
