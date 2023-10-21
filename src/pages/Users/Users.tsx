import { FC } from "react";
import { Button, Flex } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { List } from "../../components/List";

interface IProps {}

export const Users: FC<IProps> = (): JSX.Element => {
  const navigate = useNavigate();
  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      key: "id",
    },
    {
      title: "Total Kids",
      dataIndex: "kids",
      align: "center",
      sorter: (a: any, b: any) => a.kids.length - b.kids.length,
      key: "kids",
      render: (record) => record.length,
    },
    {
      title: "Bot Type",
      dataIndex: "botType",
      filters: [
        {
          text: "Telegram",
          value: "Telegram",
        },
        {
          text: "Viber",
          value: "Viber",
        },
      ],
      filterMode: "tree",
      onFilter: (value: string, record: any) => record.botType === value,
      key: "botType",
    },
    {
      title: "Subscribed",
      dataIndex: "isSubscribed",
      key: "isSubscribed",
      align: "center",
      render: (record) => record ? <CheckOutlined style={{ color: "green" }} /> :
        <CloseOutlined style={{ color: "red" }} />,
    },
    {
      title: "Frequency",
      dataIndex: "recommendationFrequency",
      key: "recommendationFrequency",
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      render: (record) => record.name,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "100px",
      align: "center",
      render: (record: any) => <Button onClick={() => navigate("/user/" + record.key)}>View</Button>,
    },
  ];

  return (
    <Flex gap="small" vertical>
      <Title level={3} style={{ margin: 0 }}>Users: </Title>
      <List resource="users" config={columns} />
    </Flex>
  );
};