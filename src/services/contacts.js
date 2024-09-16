import { ContactsCollection } from '../db/models/contact.js';

import calculatePaginationData from '../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../constants/sortOrder.js';

export const getAllContacts = async ({
  perPage,
  page,
  sortBy = '_id',
  sortOrder = SORT_ORDER[0],
  contactType,
  isFavourite,
}) => {
  const skip = (page - 1) * perPage;
  const filter = {};

  if (contactType) {
    filter.contactType = contactType;
  }

  if (typeof isFavourite !== 'undefined') {
    filter.isFavourite = isFavourite;
  }

  const contactQuery = ContactsCollection.find(filter);

  const contacts = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const count = await ContactsCollection.find(filter).countDocuments();

  const paginationData = calculatePaginationData({ count, perPage, page });

  return { contacts, page, perPage, totalItems: count, ...paginationData };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const addContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) {
    return null;
  }

  return {
    data: rawResult.value,
    // isNew: Boolean(rawResult?.lastErrorObject?.upserted), зараз це не потрiбно, але я залишу провсяк
  };
};

export const deleteContact = (filter) => {
  return ContactsCollection.findOneAndDelete(filter);
};
