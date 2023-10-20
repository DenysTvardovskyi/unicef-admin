import { FC } from "react";
import { System as SystemLayout } from "../../layouts";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import { useParams } from "react-router-dom";

interface IProps {}

export const Group: FC<IProps> = (): JSX.Element => {
  const { groupId } = useParams();
  return (
    <SystemLayout>
      <Flex gap="small" vertical>
        <Title>group {groupId}</Title>
      </Flex>
    </SystemLayout>
  );
};