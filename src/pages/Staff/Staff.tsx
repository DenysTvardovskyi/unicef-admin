import React, { FC, useEffect, useState } from "react";
import { Button, Flex, Form, Input, InputNumber, Modal, Popconfirm, Table } from "antd";
import Title from "antd/es/typography/Title";
import { ITableParams, IUser } from "../../models";
import { useApi, useNotification } from "../../hooks";

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
  const api = useApi();
  const [ form ] = Form.useForm();
  const notification = useNotification();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ data, setData ] = useState<IUser[]>([]);
  const [ tableParams, setTableParams ] = useState<ITableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [ editingKey, setEditingKey ] = useState("");
  const isEditing = (record: any) => record.key === editingKey;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values) => {
    api.users.create({ ...values }).then(() => notification.info("Invitation was sent to " + values.email + "!"));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const edit = (record: Partial<any> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      key: "id",
    },
    {
      title: "First name",
      dataIndex: "name",
      sorter: true,
      editable: true,
      key: "name",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      sorter: true,
      editable: true,
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      editable: true,
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "166px",
      align: "center",
      render: (record) => {
        const editable = isEditing(record);
        return editable ? (
          <Flex gap={8}>
            <Button onClick={() => save(record)}>
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button>Cancel</Button>
            </Popconfirm>
          </Flex>
        ) : (
          <Flex gap={8}>
            <Button disabled={editingKey !== ""} onClick={() => edit(record)}>
              Edit
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <Button>Delete</Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const save = async (record: any) => {
    try {
      const row = (await form.validateFields()) as any;
      const newData = [ ...data ];
      const index = newData.findIndex((item) => record.key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
      api.users.update({
        id: record.id,
        name: row.name,
        lastName: row.lastName,
        email: row.email,
        ...record,
      });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (id): void => {
    api.users.delete({ id }).then(() => notification.success("User was deleted!"));
  };

  useEffect(() => {
    api.users.get({}).then((users) => setData(users));
  }, []);

  return (
    <Flex gap="small" vertical>

      <Flex align="center" justify="space-between">
        <Title level={3}>Staff</Title>
        <Button type="primary" onClick={showModal}>Add</Button>
      </Flex>
      <Form form={form} component={false}>
        <Table
          dataSource={data}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          scroll={{ x: 700 }}
          pagination={{
            ...tableParams.pagination,
            onChange: cancel,
          }}
        />
      </Form>
      <Modal
        title="Invite new Admin"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form
          name="addAdmin"
          initialValues={{ name: "", lastname: "", email: "" }}
          onFinish={onFinish}

        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "First name is required!" },
            ]}
          >
            <Input placeholder={"First Name"} />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Last name is  required !" },
            ]}
          >
            <Input placeholder={"Last Name"} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "Invalid email!" },
              { required: true, message: "Email is  required!" },
            ]}
          >
            <Input placeholder={"Email"} />
          </Form.Item>
          <Form.Item>
            <Flex gap="small" align="center">
              <Button type="primary" htmlType="submit" className="login-form-button">
                Invite
              </Button>
            </Flex>

          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
};

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: any;
  index: number;
  children: React.ReactNode;
}

const EditableCell: FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};