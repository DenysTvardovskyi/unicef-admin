import { FC } from "react";
import { Avatar, Badge, Button, Col, Descriptions, DescriptionsProps, Flex, Popconfirm, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useApi, useAuthorization, useNotification } from "../../hooks";
import { getInitials } from "../../utils";
import { useTranslation } from "react-i18next";

interface IProps {}

const BADGES: any = {
  "Admin": "cyan",
  "SuperAdmin": "pink",
};

export const Profile: FC<IProps> = (): JSX.Element => {
  const { user } = useAuthorization();
  const { t } = useTranslation();
  const api = useApi();
  const notification = useNotification();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: t("account.firstName"),
      children: user?.name || "",
    },
    {
      key: "2",
      label: t("account.lastName"),
      children: user?.lastName || "",
    },
    {
      key: "3",
      label: t("account.role"),
      children: user.role,
    },
    {
      key: "4",
      label: t("account.email"),
      children: user.email,
    },
    {
      key: "5",
      label: t("account.joinDate"),
      children: (new Date(user?.createdAt || "")).toLocaleString(),
    },
    {
      key: "6",
      label: t("account.lastUpdate"),
      children: (new Date(user?.updatedAt || "")).toLocaleString(),
    },
  ];

  const handleReset = () => {
    api.authorization.password.reset({}).then(() => notification.success(""));
  };

  return (
    <Flex gap="small" vertical>
      <Flex justify="space-between" align="center">
        <Title>{t("account.title")}</Title>
        <Popconfirm title={t("account.resetConfirm")} onConfirm={() => handleReset()}>
          <Button type="primary" danger>{t("account.reset")}</Button>
        </Popconfirm>
      </Flex>
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={8}>
          <Space>
            <Badge.Ribbon text={user.role} color={BADGES[user.role || ""]}>
              <Avatar size={128} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Title style={{ margin: 0 }}>{getInitials(user)}</Title>
              </Avatar>
            </Badge.Ribbon>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={24} lg={18} xl={16}>
          <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }} items={items} />
        </Col>
      </Row>
    </Flex>
  );
};