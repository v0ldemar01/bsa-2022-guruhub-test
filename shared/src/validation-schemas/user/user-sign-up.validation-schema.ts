import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { UserSignUpRequestDto } from '~/common/types/types';
import {
  UserValidationMessage,
  UserValidationRule,
} from '~/common/enums/enums';

const NAME_PATTERN = /^[ A-Za-z0-9-'`]*$/;

const userSignUp = Joi.object({
  [getNameOf<UserSignUpRequestDto>('email')]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .min(UserValidationRule.EMAIL_MIN_LENGTH)
    .max(UserValidationRule.EMAIL_MAX_LENGTH)
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<UserSignUpRequestDto>('password')]: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required(),
  [getNameOf<UserSignUpRequestDto>('fullName')]: Joi.string()
    .trim()
    .pattern(NAME_PATTERN)
    .required()
    .min(UserValidationRule.NAME_MIN_LENGTH)
    .max(UserValidationRule.NAME_MAX_LENGTH),
});

export { userSignUp };
