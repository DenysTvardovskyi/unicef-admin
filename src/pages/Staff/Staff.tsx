import { FC, useState } from "react";
import { System as SystemLayout } from "../../layouts";
import { Button, Flex, Table } from "antd";
import Title from "antd/es/typography/Title";
import { ITableParams } from "../../models";
import { useNavigate } from "react-router-dom";

interface IProps {}

const dataSource = [
  {
    key: "1",
    name: "Prime 1",
  },
  {
    key: "2",
    name: "True",
  },
  {
    key: "3",
    name: "Vice",
  },
];

export const Staff: FC<IProps> = (): JSX.Element => {
  const columns: any = [
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
      onFilter: (value: string, record: any) => record.name.includes(value),
      key: "name",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "100px",
      align: "center",
      render: (record: any) => <Button onClick={() => console.log("delete")}>Delete</Button>,
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
        <Title level={3}>Staff</Title>
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