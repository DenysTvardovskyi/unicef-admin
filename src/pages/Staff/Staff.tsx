import React, { FC, useEffect, useState } from "react";
import { Button, Flex, Form, Input, InputNumber, Modal, Popconfirm } from "antd";
import Title from "antd/es/typography/Title";
import { useApi, useNotification } from "../../hooks";
import { List } from "../../components/List";
import { useTranslation } from "react-i18next";

interface IProps {}

export const Staff: FC<IProps> = (): JSX.Element => {
  const api = useApi();
  const { t } = useTranslation();
  const [ form ] = Form.useForm();
  const notification = useNotification();
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const [ editingKey, setEditingKey ] = useState("");
  const isEditing = (record: any) => record.key === editingKey;

  const [ refresh, setRefresh ] = useState(false);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [ refresh ]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values: any) => {
    api.staff.create({ ...values }).then(() => notification.info("Invitation was sent to " + values.email + "!"));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const edit = (record: Partial<any> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key as any);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id - b.id,
      key: "id",
    },
    {
      title: t("account.firstName"),
      dataIndex: "name",
      sorter: true,
      editable: true,
      key: "name",
    },
    {
      title: t("account.lastName"),
      dataIndex: "lastName",
      sorter: true,
      editable: true,
      key: "lastName",
    },
    {
      title: t("account.email"),
      dataIndex: "email",
      sorter: true,
      editable: true,
      key: "email",
    },
    {
      title: t("account.role"),
      dataIndex: "role",
      key: "role",
    },
    {
      title: t("users.actions"),
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "166px",
      align: "center",
      render: (record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <Flex gap={8}>
            <Button onClick={() => save(record)}>
              {t("save")}
            </Button>
            <Popconfirm title={t("cancelConfirm")} onConfirm={cancel}>
              <Button>{t("cancel")}</Button>
            </Popconfirm>
          </Flex>
        ) : (
          <Flex gap={8}>
            <Button disabled={editingKey !== ""} onClick={() => edit(record)}>
              {t("editButton")}
            </Button>
            <Popconfirm title={t("deleteConfirm")} onConfirm={() => handleDelete(record.id)}>
              <Button danger>{t("groups.delete")}</Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];
  const mergedColumns: any = columns.map((col) => {
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
      setEditingKey("");
      api.staff.update({
        id: record.id,
        user: {
          ...record,
          name: row.name,
          lastName: row.lastName,
          email: row.email,
        },
      }).then(() => {
        setRefresh(true);
      });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (id: any): void => {
    api.staff.delete({ id }).then(() => notification.success(t("deleteMessage")));
  };

  return (
    <Flex gap="small" vertical>
      <Flex align="center" justify="space-between">
        <Title level={3}>{t("sidebar.staff")}</Title>
        <Button type="primary" onClick={showModal}>{t("addButton")}</Button>
      </Flex>
      {!refresh && <Form form={form} component={false}>
        <List
          resource="staff"
          config={mergedColumns}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
        />
      </Form>}
      <Modal
        title={t("inviteAdmin")}
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