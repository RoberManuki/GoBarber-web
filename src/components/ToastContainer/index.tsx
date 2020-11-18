import React from 'react';
import { FiArrowLeftCircle, FiXCircle } from 'react-icons/fi';

import { Container, Toast } from './styles';

const ToastContainer: React.FunctionComponent = () => {
  return (
    <>
      <Container>
        <Toast hasDescription>
          <FiArrowLeftCircle size={20} />

          <div>
            <strong>Aconteceu um erro!</strong>
            <p>Não foi possível fazer login na aplicação</p>
          </div>

          <button type="button">
            <FiXCircle size={18} />
          </button>
        </Toast>

        <Toast type="succes" hasDescription={false}>
          <FiArrowLeftCircle size={20} />

          <div>
            <strong>Aconteceu um erro!</strong>
          </div>

          <button type="button">
            <FiXCircle size={18} />
          </button>
        </Toast>

        <Toast type="error" hasDescription>
          <FiArrowLeftCircle size={20} />

          <div>
            <strong>Aconteceu um erro!</strong>
            <p>Não foi possível fazer login na aplicação</p>
          </div>

          <button type="button">
            <FiXCircle size={18} />
          </button>
        </Toast>
      </Container>
    </>
  );
};

export default ToastContainer;
