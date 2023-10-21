import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Flex, Row, Skeleton, Table } from "antd";
import Title from "antd/es/typography/Title";
import { Column, Pie } from "@ant-design/plots";
import { AnalyticsBar } from "./components/AnalyticsBar";
import { columns, dataSource } from "./mocks";

interface IProps {}

export const Dashboard: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  // const notification = useNotification();
  // const loader = useLoader();
  //
  // const handleLoader = () => {
  //   const task: ILoaderTask = loader.create("Loader");
  //   loader.start(task);
  //   setTimeout(() => {
  //     loader.stop(task);
  //   }, 3000);
  // };

  const DemoPie = () => {
    const data: any = [
      {
        type: "分类一",
        value: 27,
      },
      {
        type: "分类二",
        value: 25,
      },
      {
        type: "分类三",
        value: 18,
      },
      {
        type: "分类四",
        value: 15,
      },
      {
        type: "分类五",
        value: 10,
      },
      {
        type: "其他",
        value: 5,
      },
    ];
    const config: any = {
      appendPadding: 10,
      data,
      angleField: "value",
      colorField: "type",
      radius: 0.9,
      label: {
        type: "inner",
        offset: "-30%",
        content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: "center",
        },
      },
      interactions: [
        {
          type: "element-active",
        },
      ],
    };
    return <Pie {...config} />;
  };

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

  const loading = true;

  return (

    <Flex gap={"small"} vertical>
      <Title>{t("home.title")}</Title>
      <AnalyticsBar />
      <Row gutter={[ 16, 16 ]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={12}>
          <Skeleton loading={loading} active={true}>
            <Table style={{ width: "100%" }} dataSource={dataSource} columns={columns} pagination={false} />
          </Skeleton>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          <Card title="Card title" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              {!loading && DemoPie()}
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          <Card title="Card title" style={{ width: "100%" }}>
            <Skeleton loading={loading} active={true}>
              {!loading && DemoColumn()}
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </Flex>

  );
};