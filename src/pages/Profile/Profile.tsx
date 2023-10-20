import { FC } from "react";
import { Avatar, Badge, Card, Descriptions, DescriptionsProps, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { useAuthorization } from "../../hooks";
import { getInitials } from "../../utils";

interface IProps {}

const BADGES = {
  "Admin": "cyan",
  "SuperAdmin": "pink",
};

export const Profile: FC<IProps> = (): JSX.Element => {
  const { user } = useAuthorization();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "First Name",
      children: user?.name || "",
    },
    {
      key: "2",
      label: "Last Name",
      children: user?.lastName || "",
    },
    {
      key: "3",
      label: "Role",
      children: user.role,
    },
    {
      key: "4",
      label: "Email",
      children: user.email,
    },
    {
      key: "5",
      label: "Join Date",
      children: (new Date(user.createdAt)).toLocaleString(),
    },
    {
      key: "6",
      label: "Last Update",
      children: (new Date(user.updatedAt)).toLocaleString(),
    },
  ];

  return (
    <Flex gap="small" justify={"center"} align={"center"}>
      <Card style={{ width: 500 }}>
        <Title>Profile</Title>
        <Flex vertical gap={"middle"}>
          <Flex>
            <Badge.Ribbon text={user.role} color={BADGES[user.role]}>
              <Avatar size={128} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Title style={{ margin: 0 }}>{getInitials(user)}</Title>
              </Avatar>
            </Badge.Ribbon>
          </Flex>

          <Descriptions column={1} title="User Info" items={items} />
        </Flex>

      </Card>
    </Flex>
  );
};