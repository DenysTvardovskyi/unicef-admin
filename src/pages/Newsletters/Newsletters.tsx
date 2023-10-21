import { FC, useEffect, useState } from "react";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import { List } from "../../components/List";
import { useTranslation } from "react-i18next";

interface IProps {}

export const Newsletters: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id - b.id,
      key: "id",
    },
    {
      title: t("groups.name"),
      dataIndex: "name",
      sorter: true,
      key: "name",
    },
    {
      title: "type",
      dataIndex: "type",
      sorter: true,
      key: "type",
    },
    {
      title: "frequency",
      dataIndex: "frequency",
      sorter: true,
      key: "frequency",
    },
    {
      title: "groupId",
      dataIndex: "groupId",
      sorter: (a: any, b: any) => a.id - b.id,
      key: "groupId",
    },
  ];
  const [ refresh, setRefresh ] = useState(false);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [ refresh ]);

  return (
    <Flex gap="small" vertical>
      <Title level={3}>Newsletter</Title>
      {!refresh && <List resource="newsletters" config={columns} />}
    </Flex>
  );
};