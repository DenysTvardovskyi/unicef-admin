import { FC } from "react";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";

interface IProps {}

export const TrafficAnalytics: FC<IProps> = (): JSX.Element => {
  return (
    <Flex gap="small" vertical>
      <Title>TrafficAnalytics</Title>
    </Flex>
  );
};