import { contactTypes } from '../constants/contacts.js';

const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isContactType = (contactType) => {
    return contactTypes.includes(contactType);
  };

  if (isContactType(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true') {
    return true;
  } else if (isFavourite === 'false') {
    return false;
  }
  return undefined;
};

const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  console.log(parsedContactType);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};

export default parseFilterParams;
