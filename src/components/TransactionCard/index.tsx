import React from "react";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

export const TransactionCard: React.FC = () => {
  return (
    <Container>
      <Title>Desenvolvimento</Title>
      <Amount>R$ 12.000,00</Amount>
      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <CategoryName>Vendas</CategoryName>
        </Category>
        <Date>20/01/2021</Date>
      </Footer>
    </Container>
  );
};
