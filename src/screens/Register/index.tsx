import React from "react";

import { Container, Header, Title, Form, Filds } from "./styles";

import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";

export const Register: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Filds>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
        </Filds>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
