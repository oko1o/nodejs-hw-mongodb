import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contact = await ContactsCollection.find();
  return contact;
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
