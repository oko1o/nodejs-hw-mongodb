import { model, Schema } from 'mongoose';

import { handleSaveError, setUpdateOptions } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: false,
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactSchema.post('save', handleSaveError);
contactSchema.pre('findOneAndUpdate', setUpdateOptions);
contactSchema.post('findOneAndUpdate', handleSaveError);

export const ContactsCollection = model('contacts', contactSchema);

export const sortFields = [
  'name',
  'phoneNumber',
  'mail',
  'isFavourite',
  'contactType',
];
