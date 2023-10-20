import { FC } from "react";
import { System as SystemLayout } from "../../layouts";
import { Avatar, Flex, Badge, Col, Descriptions, DescriptionsProps, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useAuthorization } from "../../hooks";

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
    <SystemLayout>
      <Flex gap="small" vertical>
        <Title>Profile</Title>
        <Row>
          <Col span={3}>
            <Badge.Ribbon text="SuperAdmin" color={BADGES["SuperAdmin"]}>
              <Avatar size={128} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Title style={{ margin: 0 }}>UA</Title>
              </Avatar>
            </Badge.Ribbon>
          </Col>
          <Col span={20} offset={1}>
            <Descriptions title="User Info" items={items} />
          </Col>
        </Row>
      </Flex>
    </SystemLayout>
  );
};