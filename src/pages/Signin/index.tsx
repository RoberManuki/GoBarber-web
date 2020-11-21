import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/input';
import Button from '../../components/button';

import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInCredentials {
  email: string;
  password: string;
}

const Signin: React.FunctionComponent = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInCredentials) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório!')
            .email('Digite um email válido!'),
          password: Yup.string().required('Digite a senha!'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Authentication error',
          description: 'Invalid credentials',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <>
      <Container>
        <Content>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <a href="login">
            <FiLogIn />
            Criar conta
          </a>
        </Content>

        <Background />
      </Container>
    </>
  );
};

export default Signin;
