import { FC } from "react";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";

interface IProps {}

export const CreateGroup: FC<IProps> = (): JSX.Element => {

  return (

    <Flex gap="small" vertical>
      <Title>create group</Title>
    </Flex>

  );
};