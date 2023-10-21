import { FC } from "react";
import { Avatar, Badge, Card, Descriptions, DescriptionsProps, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { useAuthorization } from "../../hooks";
import { getInitials } from "../../utils";
import {useTranslation} from "react-i18next";

interface IProps {}

const BADGES: any = {
  "Admin": "cyan",
  "SuperAdmin": "pink",
};

export const Profile: FC<IProps> = (): JSX.Element => {
  const { user } = useAuthorization();
  const { t } = useTranslation();

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

  return (
    <Flex gap="small" justify={"center"} align={"center"}>
      <Card style={{ width: 500 }}>
        <Title>{t("account.title")}</Title>
        <Flex vertical gap={"middle"}>
          <Flex>
            <Badge.Ribbon text={user.role} color={BADGES[user.role || ""]}>
              <Avatar size={128} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Title style={{ margin: 0 }}>{getInitials(user)}</Title>
              </Avatar>
            </Badge.Ribbon>
          </Flex>

          <Descriptions column={1} items={items} />
        </Flex>

      </Card>
    </Flex>
  );
};