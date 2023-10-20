import { FC } from "react";
import { System as SystemLayout } from "../../layouts";
import {Flex, Table} from "antd";
import Title from "antd/es/typography/Title";

interface IProps {}
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
    {
        key: '3',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
    {
        key: '4',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
    {
        key: '5',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
    {
        key: '6',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
    {
        key: '7',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Actions',
        dataIndex: 'address',
        key: 'address',
    },
];

export const Users: FC<IProps> = (): JSX.Element => {

  return (
    <SystemLayout>
      <Flex gap="small" vertical>
        <Title>All users</Title>
          <Table onClick={(item) => console.log(item) } dataSource={dataSource} columns={columns} onRow={
              (record, rowIndex) => {
                return {
                    onClick: () => {
                        console.log(`Clicked row ${rowIndex + 1}: ${record.name}`);
                    }
                }
              }
          }
              />
      </Flex>
    </SystemLayout>
  );
};