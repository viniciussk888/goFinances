import React from "react";

import { Container, Header, Title, Form } from "./styles";

import { Input } from "../../components/Forms/Input";

export const Register: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Input placeholder="Nome" />

        <Input placeholder="Preço" />
      </Form>
    </Container>
  );
};
