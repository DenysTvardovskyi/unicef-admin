import React, { FC } from "react";
import { Button, Flex, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { useApi, useNotification } from "../../hooks";
import { List } from "../../components/List";

interface IProps {}

export const Groups: FC<IProps> = (): JSX.Element => {
  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      key: "name",
    },
    {
      title: "Users",
      dataIndex: "customersCount",
      sorter: (a: any, b: any) => a.customersCount - b.customersCount,
      key: "customersCount",
    },
    {
      title: "Traffic",
      dataIndex: "customerTraffics",
      key: "customerTraffics",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "166px",
      align: "center",
      render: (record) => {
        return (
          <Flex gap={8}>
            <Button onClick={() => navigate("/group/" + record.id)}>View</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <Button danger>Delete</Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  const api = useApi();
  const notification = useNotification();
  const navigate = useNavigate();

  const handleDelete = (id): void => {
    api.groups.delete({ id }).then(() => notification.success("User was deleted!"));
  };
  return (
    <Flex gap="small" vertical>
      <Title level={3}>Groups</Title>
      <List resource="groups" config={columns} />
    </Flex>
  );
};