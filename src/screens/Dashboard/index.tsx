import React from "react";

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
    </Container>
  );
};
