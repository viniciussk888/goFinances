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
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { InputForm } from "../../components/InputForm";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();
  const datakey = "@gofinances:transactions";
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategory() {
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert("Atenção", "Selecione o tipo da transação");
    if (category.key === "category")
      return Alert.alert("Atenção", "Selecione a categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(datakey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormated = [...currentData, newTransaction];
      await AsyncStorage.setItem(datakey, JSON.stringify(dataFormated));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      return Alert.alert("Atenção", "Não foi possivel salvar");
    }
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
                onPress={() => handleTransactionTypeSelect("positive")}
                title="Entrada"
                type="up"
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                onPress={() => handleTransactionTypeSelect("negative")}
                title="Saida"
                type="down"
                isActive={transactionType === "negative"}
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
