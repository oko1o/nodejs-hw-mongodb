import Joi from 'joi';

import { contactTypes } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be no more than 20 characters long',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.empty': 'Phone number is required',
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number must be no more than 20 characters long',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().min(3).max(20).optional().messages({
    'string.email': 'Email is invalid',
    'string.min': 'Email must be at least 3 characters long',
    'string.max': 'Email must be no more than 20 characters long',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'isFavourite must be a boolean value',
  }),
  contactType: Joi.string()
    .valid(...contactTypes)
    .default('personal')
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.min': 'Contact type must be at least 3 characters long',
      'string.max': 'Contact type must be no more than 20 characters long',
      'any.only': `Contact type must be one of ${contactTypes.join(', ')}`,
      'any.required': 'Contact type is required',
    }),
});

export const contactPatchSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be no more than 20 characters long',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number must be no more than 20 characters long',
  }),
  email: Joi.string().email().min(3).max(20).optional().messages({
    'string.email': 'Email is invalid',
    'string.min': 'Email must be at least 3 characters long',
    'string.max': 'Email must be no more than 20 characters long',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'isFavourite must be a boolean value',
  }),
  contactType: Joi.string()
    .valid(...contactTypes)
    .min(3)
    .max(20)
    .messages({
      'string.min': 'Contact type must be at least 3 characters long',
      'string.max': 'Contact type must be no more than 20 characters long',
      'any.only': `Contact type must be one of ${contactTypes.join(', ')}`,
    }),
});
