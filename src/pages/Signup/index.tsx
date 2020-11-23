import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, Background, AnimationContainer } from './styles';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Input from '../../components/input';
import Button from '../../components/button';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FunctionComponent = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignupFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório!'),
          email: Yup.string()
            .required('Email obrigatório!')
            .email('Digite um email válido!'),
          password: Yup.string().min(6, 'Tamanho mínimo de 6 caracteres!'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'succes',
          title: 'Succesfull!',
          description: 'User created.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Creation error',
          description: 'Invalid credentials',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <Background />

        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="GoBarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu cadastro</h1>

              <Input name="name" icon={FiUser} placeholder="Name" />
              <Input name="email" icon={FiMail} placeholder="Email" />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Cadastrar</Button>
            </Form>

            <Link to="/">
              <FiArrowLeft />
              Voltar
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default Signup;
