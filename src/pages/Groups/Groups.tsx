import { FC } from "react";
import { System as SystemLayout } from "../../layouts";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";

interface IProps {}

export const Groups: FC<IProps> = (): JSX.Element => {
  return (
    <SystemLayout>
      <Flex gap="small" vertical>
        <Title>all groups</Title>
      </Flex>
    </SystemLayout>
  );
};