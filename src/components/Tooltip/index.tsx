import React from 'react';
import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <>
      <Container className={className}>
        <span>{title}</span>
        {children}
      </Container>
    </>
  );
};

export default Tooltip;
