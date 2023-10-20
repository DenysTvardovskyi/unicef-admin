import { FC } from "react";
import { useApi, useAuthorization } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Result } from "antd";
import { useTranslation } from "react-i18next";
import { constants } from "../../styles/constants";
import Title from "antd/es/typography/Title";

interface IProps {}

export const SignIn: FC<IProps> = (): JSX.Element => {
  const api = useApi();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthorized, setAuthorization } = useAuthorization();

  const onFinish = (values: any) => {
    console.log(values);
    api.authorization.signIn({ email: values.email, password: values.password, loader: t("signIn.loader.title") })
      .then(({ accessToken, user: any }) => {
        setAuthorization(accessToken, user);
        navigate("/");
      });
  };

  return !isAuthorized ? (
    <>
        <Title level={1} style={{color: constants.blue}}>НУМО</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            { type: "email", message: t("signIn.email.validation.email") },
            { required: true, message: t("signIn.email.validation.required") },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={t("signIn.email.title")} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[ { required: true, message: t("signIn.password.validation.required") } ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t("signIn.password.title")}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t("signIn.remember.title")}</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Flex gap="small" align="center">
            <Button style={{background: constants.blue}} type="primary" htmlType="submit" className="login-form-button">
              {t("signIn.navigation.logIn")}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  ) : (
    <Flex style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
      <Result
        icon={<SmileOutlined style={{ color: constants.blue }} />}
        title={t("signIn.authorized.title")}
        extra={
          <Link to="/"><Button
            type="primary"
            style={{ background: constants.blue }}
          >{t("signIn.authorized.goHome")}</Button></Link>
        }
      />
    </Flex>
  );
};
