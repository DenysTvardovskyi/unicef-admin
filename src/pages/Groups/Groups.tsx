import { FC, useState } from "react";
import { Button, Flex, Table } from "antd";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { ITableParams } from "../../models";

interface IProps {}

const dataSource = [
  {
    key: "1",
    name: "Prime 1",
    totalUsers: 32,
  },
  {
    key: "2",
    name: "True",
    totalUsers: 42,
  },
  {
    key: "3",
    name: "Vice",
    totalUsers: 42,
  },
];

export const Groups: FC<IProps> = (): JSX.Element => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "True",
          value: "True",
        },
        {
          text: "Vice",
          value: "Vice",
        },
      ],
      filterSearch: true,
      onFilter: (value: string, record) => record.name.includes(value),
      key: "name",
    },
    {
      title: "Users",
      dataIndex: "totalUsers",
      sorter: (a, b) => a.totalUsers - b.totalUsers,
      key: "totalUsers",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "100px",
      align: "center",
      render: (record) => <Button onClick={() => navigate("/group/" + record.key)}>View</Button>,
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

    <Flex gap="small" vertical>
      <Title level={3}>Groups</Title>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: 700 }}
        pagination={tableParams.pagination}
      />
    </Flex>

  );
};