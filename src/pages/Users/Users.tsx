import { FC } from "react";
import { Button, Flex } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { List } from "../../components/List";
import { UsersConfig } from "./Users.config";

interface IProps {}

export const Users: FC<IProps> = (): JSX.Element => {
  const navigate = useNavigate();

  const renderView = (record: any) => <Button onClick={() => navigate("/user/" + record.key)}>View</Button>;
  const renderSubscription = (record) => record ? <CheckOutlined style={{ color: "green" }} /> : <CloseOutlined style={{ color: "red" }} />;

  return (
    <Flex gap="small" vertical>
      <Title level={3} style={{ margin: 0 }}>Users: </Title>
      <List resource="users" config={UsersConfig({onView: renderView, onSub: renderSubscription})} />
    </Flex>
  );
};