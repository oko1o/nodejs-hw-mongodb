import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseFilterParams from '../utils/parseFilterParams.js';
import saveFileToUploadDir from '../utils/saveFileToUploadDir.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

import { sortFields } from '../db/models/contact.js';

const enableCloudinary = env('ENABLE_CLOUDINARY');

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseFilterParams(req.query);

  const { _id: userId } = req.user;

  const data = await contactServices.getAllContacts({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter: { ...filter, userId },
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.getContact({ _id: contactId, userId });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Contact with id = ${contactId} successfully found`,
    data,
  });
};

export const addContactController = async (req, res) => {
  let photo;

  if (req.file) {
    if (enableCloudinary === 'true') {
      photo = await saveFileToCloudinary(req.file, 'photos');
    } else {
      photo = await saveFileToUploadDir(req.file);
    }
  }

  const { _id: userId } = req.user;
  const data = await contactServices.addContact({ ...req.body, userId, photo });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  let updatedData = { ...req.body };

  if (req.file) {
    let photo;
    if (enableCloudinary === 'true') {
      photo = await saveFileToCloudinary(req.file, 'photos');
    } else {
      photo = await saveFileToUploadDir(req.file);
    }
    updatedData.photo = photo;
  }

  const data = await contactServices.updateContact(
    { _id: contactId, userId },
    updatedData,
  );

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    ...data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.deleteContact({ _id: contactId, userId });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
