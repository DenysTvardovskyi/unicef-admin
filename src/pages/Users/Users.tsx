import { FC, useState } from "react";
import { System as SystemLayout } from "../../layouts";
import { Button, Flex, Table } from "antd";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { ITableParams } from "../../models";

interface IProps {}

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "3",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "4",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "5",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "6",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "7",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

export const Users: FC<IProps> = (): JSX.Element => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Mike",
          value: "Mike",
        },
        {
          text: "John",
          value: "John",
        },
      ],
      filterSearch: true,
      onFilter: (value: string, record) => record.name.includes(value),
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "100px",
      align: "center",
      render: (record) => <Button onClick={() => navigate("/user/" + record.key)}>View</Button>,
    },
  ];
  const navigate = useNavigate();
  const [ data, setData ] = useState<any[]>(dataSource);
  const [ tableParams, setTableParams ] = useState<ITableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  return (
    <SystemLayout>
      <Flex gap="small" vertical>
        <Title level={3}>Users</Title>
        <Table
          dataSource={data}
          columns={columns}
          scroll={{ x: 700 }}
          pagination={tableParams.pagination}
        />
      </Flex>
    </SystemLayout>
  );
};