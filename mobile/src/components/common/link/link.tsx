import { Link as UILink } from '@react-navigation/native';
import React, { ComponentProps, FC } from 'react';

type Props = {
  label: string;
  to: ComponentProps<typeof UILink>['to'];
};

const Link: FC<Props> = ({ label, to }) => {
  return <UILink to={to}>{label}</UILink>;
};

export { Link };
