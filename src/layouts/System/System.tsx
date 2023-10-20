import React, { FC, useState } from "react";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Menu, Select } from "antd";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import Title from "antd/lib/typography/Title";
import { useAuthorization } from "../../hooks";
import {constants} from "../../styles/constants";

const { Header, Content, Sider } = Layout;

const LANGUAGES: any = {
  en: { nativeName: "En" },
  ua: { nativeName: "Ua" },
};

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const System: FC<IProps> = ({ children }: IProps): JSX.Element => {
  const [ collapsed, setCollapsed ] = useState(false);
  const { t } = useTranslation();
  const { resetAuthorization } = useAuthorization();

  const langOptions: { value: string, label: string }[] = Object.keys(LANGUAGES)
    .map((lng) => ({ value: lng, label: LANGUAGES[lng].nativeName }));

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Layout>
      <Sider
        trigger={null} collapsible collapsed={collapsed}
        breakpoint="lg"
        style={{
            overflow: "auto",
            height: "100vh",
            backgroundColor: constants.blue,
        }}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Flex style={{ height: "100%" }} vertical>
          <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Title level={4} style={{ margin: 0, lineHeight: 1, color: constants.white}}>НУМО</Title>
          </div>
          <Flex style={{ height: "100%" }} vertical justify="space-between">
            <Menu
              mode="inline"
              defaultSelectedKeys={[ "1" ]}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: "nav 1",
                },
              ]}
              style={{background: constants.blue}}
            />
            <Button
              style={{ margin: "0 4px 16px 4px" }}
              onClick={resetAuthorization}
              icon={<LogoutOutlined />}
            >Log out</Button>
          </Flex>
        </Flex>

      </Sider>
      <Layout className="site-layout" style={{ minHeight: "100vh" }}>
        <Header
          style={{
            padding: 0,
            background: constants.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
                color: constants.brown,
              fontSize: "16px",
              width: 48,
              height: 48,
            }}
          />
          <Select
            defaultValue={i18n.resolvedLanguage}
            theme="dark"
            style={{ width: 120, marginRight: 16 }}
            onChange={handleChange}
            options={langOptions}
          />
        </Header>
        <Content style={{ margin: "24px 16px" }}>
          <div style={{ padding: 24, height: "100%", background: "#ffffff" }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
