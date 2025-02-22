import * as Joi from 'joi';

import { GroupValidationRule } from '~/common/enums/enums';
import { GroupValidationMessage } from '~/common/enums/group/group';
import { GroupsCreateRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const groupCreate = Joi.object({
  [getNameOf<GroupsCreateRequestDto>('name')]: Joi.string()
    .trim()
    .min(GroupValidationRule.NAME_MIN_LENGTH)
    .max(GroupValidationRule.NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': GroupValidationMessage.NAME_REQUIRE,
      'string.min': GroupValidationMessage.NAME_MIN_LENGTH,
      'string.max': GroupValidationMessage.NAME_MAX_LENGTH,
    }),
  [getNameOf<GroupsCreateRequestDto>('permissionIds')]: Joi.array()
    .items(Joi.number())
    .min(GroupValidationRule.PERMISSION_IDS_MIN_LENGTH)
    .required()
    .messages({
      'array.empty': GroupValidationMessage.PERMISSION_IDS_REQUIRE,
      'array.min': GroupValidationMessage.PERMISSION_IDS_MIN_LENGTH,
    }),
  [getNameOf<GroupsCreateRequestDto>('userIds')]: Joi.array().items(
    Joi.number(),
  ),
});

export { groupCreate };
