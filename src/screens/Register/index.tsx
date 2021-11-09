import React, { useState } from "react";

import {
  Container,
  Header,
  Title,
  Form,
  Filds,
  TransactionsTypes,
} from "./styles";

import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";

export const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Filds>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionsTypes>
            <TransactionTypeButton
              onPress={() => handleTransactionTypeSelect("up")}
              title="Entrada"
              type="up"
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              onPress={() => handleTransactionTypeSelect("down")}
              title="Saida"
              type="down"
              isActive={transactionType === "down"}
            />
          </TransactionsTypes>
        </Filds>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
