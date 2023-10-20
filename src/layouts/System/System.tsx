import React, { FC, useState } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Select, Typography } from "antd";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import Title from "antd/lib/typography/Title";

const { Header, Content, Sider } = Layout;

const LANGUAGES: any = {
  en: { nativeName: "En" },
  ua: { nativeName: "Ua" },
};

interface IProps {
  main?: {
    isFull?: boolean;
    className?: string;
  };
  children?: React.ReactNode | React.ReactNode[];
}

export const System: FC<IProps> = ({ main, children }: IProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

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

        }}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div style={{height: 64, display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Title level={4} style={{margin: 0, lineHeight: 1}}>НУМО </Title>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout" style={{ minHeight: "100vh" }}>
        <Header style={{ padding: 0, background: "#001529", display: "flex", alignItems: "center", justifyContent: "space-between", }} >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 48,
              height: 48,
              color: "#ffffff"
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
          <div style={{ padding: 24, height: "100%", background: "blue" }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
