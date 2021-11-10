import React, { useState } from "react";
import { Modal } from "react-native";
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
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

export const Register: React.FC = () => {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategory() {
    setCategoryModalOpen(true);
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
          <CategorySelectButton
            onPress={handleOpenSelectCategory}
            title="Categoria"
          />
        </Filds>

        <Button title="Enviar" />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
};
