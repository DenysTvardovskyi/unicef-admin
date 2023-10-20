import { FC } from "react";
import { System as SystemLayout } from "../../layouts";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";

interface IProps {}

export const CreateGroup: FC<IProps> = (): JSX.Element => {

  return (
    <SystemLayout>
      <Flex gap="small" vertical>
        <Title>create group</Title>
      </Flex>
    </SystemLayout>
  );
};