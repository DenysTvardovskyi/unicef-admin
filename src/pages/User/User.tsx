import { FC } from "react";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import { useParams } from "react-router-dom";

interface IProps {}

export const User: FC<IProps> = (): JSX.Element => {
  const { userId } = useParams();
  return (
    <Flex gap="small" vertical>
      <Title>user {userId}</Title>
    </Flex>
  );
};