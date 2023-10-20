import React, { FC, useEffect, useState } from "react";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  FundOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Layout, Menu, MenuProps, Select, Badge } from "antd";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import Title from "antd/lib/typography/Title";
import { useAuthorization } from "../../hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { constants } from "../../styles/constants";

const { Header, Content, Sider } = Layout;

const LANGUAGES: any = {
  en: { nativeName: "En" },
  ua: { nativeName: "Ua" },
};

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const LINKS = [
  getItem(<Link to="/">Dashboard</Link>, "/", <AppstoreOutlined />),
  getItem(<Link to="/users">Users</Link>, "/users", <UserOutlined />),
  getItem("Groups", "/group", <TeamOutlined />, [
    getItem(<Link to="/group/all">All</Link>, "/group/all"),
    getItem(<Link to="/group/create">Creat</Link>, "/group/create"),
  ]),
  getItem("Analytics", "/analytics", <FundOutlined />, [
    getItem(<Link to="/analytics/users">Users</Link>, "/analytics/users"),
    getItem(<Link to="/analytics/traffic">Traffic</Link>, "/analytics/traffic"),
    getItem(<Link to="/analytics/activity">Activity</Link>, "/analytics/activity"),
    getItem(<Link to="/analytics/newsletter">Newsletter</Link>, "/analytics/newsletter"),
  ]),
  getItem(<Link to="/staff">Staff</Link>, "/staff", <CoffeeOutlined />),
];

export const System: FC<IProps> = ({ children }: IProps): JSX.Element => {
  const [ collapsed, setCollapsed ] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
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
          <div style={{ minHeight: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Title level={4} style={{ margin: 0, lineHeight: 1, color: constants.white }}>НУМО</Title>
          </div>
          <Flex style={{ height: "100%" }} vertical justify="space-between">
            <Menu
              mode="inline"
              defaultSelectedKeys={[ location.pathname ]}
              defaultOpenKeys={[ LINKS.filter((link) => (location.pathname).split(link.key).length === 2)[0].key ]}
              items={LINKS}
              style={{ background: constants.blue }}
            />

            {collapsed
              ? <Button
                style={{ margin: "0 4px 16px 4px", alignSelf: "center" }}
                onClick={resetAuthorization}
                icon={<LogoutOutlined />}
                shape={collapsed ? "circle" : "default"}
              />
              : <Button
                style={{ margin: "0 4px 16px 4px" }}
                onClick={resetAuthorization}
                icon={<LogoutOutlined />}
              >Log out</Button>
            }
          </Flex>
        </Flex>
      </Sider>
      <Layout className="site-layout" style={{ height: "100vh" }}>
        <Header
          style={{
            padding: "0 16px 0 0",
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
          <Flex gap={16} align="center">
            <Select
              defaultValue={i18n.resolvedLanguage}
              theme="dark"
              style={{ width: 60 }}
              onChange={handleChange}
              options={langOptions}
            />
            <Avatar
              size={32}
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            />
          </Flex>

        </Header>
        <Content style={{ margin: "24px 16px", height: "100%" }}>
          <div style={{ padding: 24, height: "100%", background: "#ffffff", overflowY: "auto" }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
