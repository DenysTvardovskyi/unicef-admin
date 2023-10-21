import { FC } from "react";
import { Card, Col, Row, Skeleton } from "antd";
import Title from "antd/es/typography/Title";

interface IProps {}

const cartStyles: any = {
  width: "100%",
};

const cartContentStyles: any = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const mocks: any = [
  { value: 900, label: "Number" },
  { value: 50, label: "Number" },
  { value: 1000, label: "Number" },
  { value: 23, label: "Number" },
  { value: 2300, label: "Number" },
  { value: 5010, label: "Number" },
];

const getAnalyticsCards = () =>
  mocks.map((data: any) =>
    <Col xs={24} sm={12} md={8} lg={4} xl={4}>
      <Card style={cartStyles}>
        <Skeleton loading={data.value > 900} active style={cartContentStyles}>
          <Title level={2}>{data.value}</Title>
          <Title level={5}>{data.label}</Title>
        </Skeleton>
      </Card>
    </Col>,
  );

export const AnalyticsBar: FC<IProps> = () => {
  return (
    <Row gutter={[ 16, 16 ]}>
      {getAnalyticsCards()}
    </Row>
  );
};