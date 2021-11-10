import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Form,
  Filds,
  TransactionsTypes,
} from "./styles";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputForm } from "../../components/InputForm";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("Valor é obrigatório"),
});

export const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
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

  function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert("Atenção", "Selecione o tipo da transação");
    if (category.key === "category")
      return Alert.alert("Atenção", "Selecione a categoria");

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Filds>
            <InputForm
              autoCapitalize="sentences"
              autoCorrect={false}
              name="name"
              control={control}
              placeholder="Nome"
              error={errors.name && errors.name.message}
            />
            <InputForm
              keyboardType="numeric"
              name="amount"
              control={control}
              placeholder="Preço"
              error={errors.amount && errors.amount.message}
            />

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
              title={category.name}
            />
          </Filds>

          <Button onPress={handleSubmit(handleRegister)} title="Enviar" />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
