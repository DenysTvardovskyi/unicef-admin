import { FC, useEffect, useState } from "react";
import { Descriptions, Flex, Skeleton } from "antd";
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
  kids: "kids",
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

  return (
    <Flex gap="small" vertical>
      <Skeleton loading={!user} active={true}>
        <Title>user {userId}</Title>
        <Descriptions title={t(`user-info.title`)}>
          {items.map((item) => (
            <Descriptions.Item key={item.key} label={t(`user-info.${item.key}`)}>
              {item.children}
            </Descriptions.Item>
          ))}
        </Descriptions></Skeleton>
    </Flex>
  );
};