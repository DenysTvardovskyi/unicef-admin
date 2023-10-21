import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Flex, Row, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import { Column } from "@ant-design/plots";
import { AnalyticsBar } from "./components/AnalyticsBar";
import { useApi } from "../../hooks";
import { IUser } from "../../models";
import { IData } from "../../models/data";
import { PieChart } from "./components/PieChart";

interface IProps {}

export const Dashboard: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();

  const DemoColumn = () => {
    const data: any = [
      {
        type: "家具家电",
        sales: 38,
      },
      {
        type: "粮油副食",
        sales: 52,
      },
      {
        type: "生鲜水果",
        sales: 61,
      },
      {
        type: "美容洗护",
        sales: 145,
      },
      {
        type: "母婴用品",
        sales: 48,
      },
      {
        type: "进口食品",
        sales: 38,
      },
      {
        type: "食品饮料",
        sales: 38,
      },
      {
        type: "家庭清洁",
        sales: 38,
      },
    ];
    const config: any = {
      data,
      xField: "type",
      yField: "sales",
      label: {
        // 可手动配置 label 数据标签位置
        position: "middle",
        // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: "#ffffff",
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: "类别",
        },
        sales: {
          alias: "销售额",
        },
      },
    };
    return <Column {...config} />;
  };

  const api = useApi();
  const [ data, setData ] = useState<IData>();
  const [ users, setUsers ] = useState<IUser[]>([]);

  const convertToAnalyticsData = (values:any) => ({ users: values[0], groups: values[1], regions: values[2] });

  useEffect(() => {
    Promise.all([
        api.users.get({}).then(r => r),
        api.groups.get({}).then(r => r),
        api.regions.get({}).then(r => r),
      ],
    ).then(value => setData(convertToAnalyticsData(value)));
  }, []);

  useEffect(() => {
    // @ts-ignore
    api.users.get({ params: { pagination: [ { pageSize: 1000000, page: 1 } ] } })
      .then((r: any) => setUsers(r.items));

  }, []);

  const loading = !data;

  return (

    <Flex gap={"small"} vertical>
      <Title>{t("home.title")}</Title>
      <AnalyticsBar data={data} />
      <Row gutter={[ 16, 16 ]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          <Card title="Card title" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              <PieChart users={users} />
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          <Card title="Card title" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              {DemoColumn()}
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={12}>
          <Skeleton loading={loading} active={true}>

          </Skeleton>
        </Col>
      </Row>
    </Flex>

  );
};