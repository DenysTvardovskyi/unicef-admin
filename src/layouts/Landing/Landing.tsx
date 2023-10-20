import React, { FC } from "react";
import Title from "antd/lib/typography/Title";

import { Layout } from "antd";
import {constants} from "../../styles/constants";

const { Header, Content, Footer } = Layout;

interface IProps {
  main?: {
    className?: string;
  };
  children?: React.ReactNode | React.ReactNode[];
}

export const Landing: FC<IProps> = ({ children }: IProps): JSX.Element => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
            backgroundColor: constants.blue
        }}
      >
        <Title level={2} style={{color: constants.white}}>НУМО</Title>
      </Header>
      <Content style={{ padding: "50px 50px 0 50px", height: "100%" }}>
        <div style={{ padding: 24, height: '100%', background: "#ffffff", overflowY: "auto" }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2023 Created by JWP</Footer>
    </Layout>
  );
};
