import React, { FC } from "react";

import {Col, Flex, Layout, Row} from "antd";

const { Content, Footer } = Layout;

interface IProps {
  main?: {
    className?: string;
  };
  children?: React.ReactNode | React.ReactNode[];
}

export const AuthLayout: FC<IProps> = ({ children }: IProps): JSX.Element => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Content style={{ padding: "50px 50px 0 50px", height: "100%" }}>
          <Flex style={{ padding: 24, height: '100%', background: "#ffffff", overflowY: "auto" }}>
              <Row justify={"center"} align={"middle"} style={{ width: "100%"}} gutter={[16, 16]}>
                  <Col xs={24} sm={18} md={14} lg={10} xl={6}>
                      {children}
                  </Col>
              </Row>

          </Flex>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2023 Created by JWP</Footer>
    </Layout>
  );
};
