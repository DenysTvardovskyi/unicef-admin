import { FC } from "react";
import { Link } from "react-router-dom";
import { useApi, useAuthorization } from "../../hooks";
import { System as SystemLayout } from "../../layouts";
import { Button, Checkbox, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface IProps {}

export const SignUp: FC<IProps> = (): JSX.Element => {
  const api = useApi();
  const { t } = useTranslation();
  const { isAuthorized } = useAuthorization();

  const onFinish = (values: any) => {
    api.authorization.signUp({
      fullname: values.fullname,
      password: values.password,
      email: values.email,
      loader: t("loader.loader.title"),
    }).then(() => {
      console.log("sign up");
    });
  };

  return !isAuthorized ? (
    <SystemLayout>
      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="fullname"
          rules={[ { required: true, message: t("signUp.fullname.validation.required"), whitespace: true } ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t("signUp.fullname.title")} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { type: "email", message: t("signUp.email.validation.email") },
            { required: true, message: t("signUp.email.validation.required") },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={t("signUp.email.title")} />
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback
          rules={[ { required: true, message: t("signUp.password.validation.required") } ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t("signUp.password.title")}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={[ "password" ]}
          hasFeedback
          rules={[
            { required: true, message: t("signUp.confirm.validation.required") },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("signUp.confirm.validation.noMatch")));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t("signUp.confirm.title")}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error(t("signUp.agreement.validation.required"))),
            },
          ]}
        >
          <Checkbox>
            {t("signUp.agreement.title")}
            <a href="">{t("signUp.agreement.linkText")}</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("signUp.navigation.register")}
          </Button>
        </Form.Item>
      </Form>
    </SystemLayout>
  ) : (
    <SystemLayout>
      <Title>{t("signUp.authorized.title")}</Title>
      <Link to="/">{t("signUp.authorized.goHome")}</Link>
    </SystemLayout>
  );
};
