import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// eslint-disable-next-line prettier/prettier
const Button: React.FunctionComponent<ButtonProps> = ({children , ...rest}) => (
  <>
    <Container type="button" {...rest}>
      {children}
    </Container>
  </>
);

export default Button;
