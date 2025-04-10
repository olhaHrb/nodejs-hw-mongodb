import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at last {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().min(8).max(13).required().messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should have at last {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email is not valid',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type should be a string',
      'string.valid': 'Contact type is not valid',
      'any.required': 'Contact type is required',
    }),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at last {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().min(8).max(13).messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should have at last {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email is not valid',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type should be a string',
    'string.valid': 'Contact type is not valid',
  }),
});
