import React, { FC } from "react";
import { Button, Flex, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { useApi, useNotification } from "../../hooks";
import { List } from "../../components/List";
import {useTranslation} from "react-i18next";

interface IProps {}

export const Groups: FC<IProps> = (): JSX.Element => {
  const {t} = useTranslation()

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      key: "id",
    },
    {
      title: t("groups.name"),
      dataIndex: "name",
      sorter: true,
      key: "name",
    },
    {
      title:  t("groups.users"),
      dataIndex: "customersCount",
      sorter: (a: any, b: any) => a.customersCount - b.customersCount,
      key: "customersCount",
    },
    {
      title: t("groups.traffic"),
      dataIndex: "customerTraffics",
      key: "customerTraffics",
    },
    {
      title: t("groups.actions"),
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "166px",
      align: "center",
      render: (record) => {
        return (
          <Flex gap={8}>
            <Button onClick={() => navigate("/group/" + record.id)}>{t("groups.view")}</Button>
            <Popconfirm title={t("groups.deleteConfirm")} onConfirm={() => handleDelete(record.id)}>
              <Button danger>{t("groups.delete")}</Button>
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
    api.groups.delete({ id }).then(() => notification.success("Groud was deleted!"));
  };
  return (
    <Flex gap="small" vertical>
      <Title level={3}>{t("groups.title")}</Title>
      <List resource="groups" config={columns} />
    </Flex>
  );
};