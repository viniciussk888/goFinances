import React, { useCallback, useState } from "react";

import { HighLigthCard } from "../../components/HighLigthCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Container,
  Header,
  UserWrapper,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  Icon,
  LogoutButton,
  HighLigthCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export const Dashboard: React.FC = () => {
  const datakey = "@gofinances:transactions";
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransaction() {
    const response = await AsyncStorage.getItem(datakey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormated: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-br", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    setData(transactionsFormated);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, [])
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/30902898?s=400&u=1917007584302204c9c4f6a7620fcb1940e2acce&v=4",
              }}
            />
            <User>
              <UserGreeting>Olá</UserGreeting>
              <UserName>Alberto</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighLigthCards>
        <HighLigthCard
          type="up"
          title="Entradas"
          amount="R$ 17.000,00"
          lastTransaction="Ultima entrada 10 de abril"
        />
        <HighLigthCard
          type="down"
          title="Saidas"
          amount="R$ 18.000,00"
          lastTransaction="Ultima saida 12 de abril"
        />
        <HighLigthCard
          type="total"
          title="Total"
          amount="R$ 20.000,00"
          lastTransaction="01 à 19 de abril"
        />
      </HighLigthCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
