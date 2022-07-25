import { Resolver } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { FormControlValues, ValidationSchema } from '~/common/types/types';

const getFormValidationResolver = <T extends FormControlValues>(
  validationSchema: ValidationSchema,
): Resolver<T> => {
  return joiResolver(validationSchema);
};

export { getFormValidationResolver };
