import { FC, useEffect, useState } from "react";
import { Card, Col, Flex, Result, Row, Select, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";
import { useApi } from "../../hooks";
import { ColumnChart, LineChart, PieChart } from "../../components";
import { ICustomer } from "../../models/customer";
import { FileSearchOutlined } from "@ant-design/icons";
import { constants } from "../../styles/constants";

interface IProps {}

export const UserAnalytics: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const api = useApi();
  const [ groups, setGroups ] = useState<any[]>([]);
  const [ selected, setSelected ] = useState<string>();
  const [ data, setData ] = useState<ICustomer[]>();
  const [ kids, setKids ] = useState<{ age: number, preschoolState: string }[]>();

  useEffect(() => {
    // @ts-ignore
    api.groups.get({ params: { pagination: [ { pageSize: 1000000, page: 1 } ] } })
      .then((r: any) => setGroups(r.items.map(({ id, name }: any) => ({ value: id, label: name }))));

  }, []);

  const loading = !groups;

  const handleChange = (id: any) => {
    setSelected(id);
    // @ts-ignore
    api.groups.customers({ id, params: { pagination: [ { pageSize: 1000000, page: 1 } ] } })
      .then((r) => {
        setData([ ...r.items ]);
        setKids(r.items.map((item: any) => item.kids).flat(Infinity));
      });
  };

  return (
    <Flex gap="small" vertical>
      <Flex vertical>
        <Title>{t("analytics.users.title")}</Title>
        <Flex align={"center"} justify={"space-between"}>
          <Select
            placeholder={"Select a group"}
            style={{ width: "280px" }}
            onChange={handleChange}
            value={selected}
            options={groups}
          />
          {selected && <Title style={{ margin: 0 }} level={5}>Users in group: {data?.length}</Title>}
        </Flex>

      </Flex>
      {data?.length ? <Row gutter={[ 16, 16 ]}>
        <Skeleton loading={loading} active={true}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Card title={"Kids age"}>
              <LineChart data={kids} keyword={"age"} />
            </Card>
          </Col>
        </Skeleton>
        <Skeleton loading={loading} active={true}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Card title={"Recommendation day"}>
              <LineChart data={data} keyword={"recommendationDay"} />
            </Card>
          </Col>
        </Skeleton>
        <Skeleton loading={loading} active={true}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Card title={"Conversation state"}>
              <ColumnChart data={data} keyword={"conversationState"} />
            </Card>
          </Col>
        </Skeleton>
        <Skeleton loading={loading} active={true}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Card title={"Bot type"}>
              <PieChart data={kids} keyword={"preschoolStatus"} />
            </Card>
          </Col>
        </Skeleton>
      </Row> : <Result
        icon={< FileSearchOutlined color={constants.blue} />}
        title={selected ? "Please select another group" : "Please select a group"}
      />}
    </Flex>
  );
};