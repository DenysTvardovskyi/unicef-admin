import { FC, useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Descriptions, Flex, Skeleton, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks";
import { useTranslation } from "react-i18next";

interface IProps {}

const tableData: any = {
  botType: "botType",
  recommendationFrequency: "recommendationFrequency",
  conversationState: "conversationState",
  recommendationDay: "recommendationDay",
  recommendationTime: "recommendationTime",
  regionId: "regionId",
  isSubscribed: "isSubscribed",
  region: "region",
  kidsCount: "kidsCount",
  id: "id",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

export const User: FC<IProps> = (): JSX.Element => {
  const { userId } = useParams();
  const { t } = useTranslation();
  const api = useApi();
  const [ user, setUser ] = useState<any>();

  useEffect(() => {
    if (userId) {
      api.users.one({ id: userId }).then((r) => {
        setUser(r.items[0]);
      });
    }
  }, [ userId ]);

  const items = user
    ? Object.keys(tableData).map((key: any) => ({
      key,
      label: tableData[key],
      children: key === "region" ? user[key].name : user[key],
    }))
    : [];

  const config: any = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id - b.id,
      key: "id",
    },
    {
      title: t(`user-info.name`),
      dataIndex: "name",
      sorter: true,
      key: "name",
    },
    {
      title: t(`user-info.age`),
      dataIndex: "age",
      align: "center",
      sorter: (a: any, b: any) => a.age - b.age,
      key: "age",
    },
    {
      title: t(`user-info.preschoolStatus`),
      dataIndex: "preschoolStatus",
      key: "preschoolStatus",
      align: "center",
    },
  ];

  return (
    <Flex gap="small" vertical>
      <Skeleton loading={!user} active={true}>
        <Descriptions title={t(`user-info.title`)}>
          {items.map((item) => {

            if (item.key.includes("is")) {
              return (
                <Descriptions.Item key={item.key} label={t(`user-info.${item.key}`)}>
                  {item.children ? <CheckOutlined style={{ color: "green" }} /> : <CloseOutlined style={{ color: "red" }} />}
                </Descriptions.Item>
              );
            }

            if (item.key.includes("At")) {
              return (
                <Descriptions.Item key={item.key} label={t(`user-info.${item.key}`)}>
                  {new Date(item.children).toLocaleString()}
                </Descriptions.Item>
              );
            }

            return (
              <Descriptions.Item key={item.key} label={t(`user-info.${item.key}`)}>
                {item.children}
              </Descriptions.Item>
            );
          })}
        </Descriptions>

        <Title level={5}>{t(`user-info.children`)}</Title>
        <Table loading={!user?.kids?.length} columns={config} dataSource={user?.kids || []} />
      </Skeleton>
    </Flex>
  );
};