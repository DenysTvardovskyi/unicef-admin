import React, { FC, useState } from "react";
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
import "./navigation.css"
import {getInitials} from "../../utils";
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
  const {user} = useAuthorization()
  const [ collapsed, setCollapsed ] = useState(false);
  const [ hasBreakPoint, setBreakPoint ] = useState(false);
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
          trigger={null}
        collapsedWidth={hasBreakPoint ? "0" : "80"}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken)
          setBreakPoint(broken)
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          backgroundColor: constants.blue,
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
              defaultOpenKeys={[ LINKS.filter((link) => (location.pathname).split(link.key).length === 2)?.[0]?.key || "" ]}
              items={LINKS}
              style={{background: constants.blue, color: constants.white}}
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
      <Layout className="site-layout" style={{ maxHeight: "100vh" }}>
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
              style={{ cursor: "pointer", fontSize: 16}}
              onClick={() => navigate("/profile")}
            >{getInitials(user)}</Avatar>
          </Flex>

        </Header>
        <Content style={{ margin: "24px 16px", maxHeight: "100%", }}>
          <div style={{ padding: 16, height: "100%", overflowY:"auto", background: constants.white}}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
