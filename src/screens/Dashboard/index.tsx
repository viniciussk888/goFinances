import React from "react";

import { HighLigthCard } from "../../components/HighLigthCard";
import { TransactionCard } from "../../components/TransactionCard";

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
  HighLigthCards,
  Transactions,
  Title,
} from "./styles";

export const Dashboard: React.FC = () => {
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

          <Icon name="power" />
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

        <TransactionCard />
      </Transactions>
    </Container>
  );
};
