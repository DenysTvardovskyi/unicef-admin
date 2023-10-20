import { FC } from "react";
import { System as SystemLayout } from "../../layouts";
import Title from "antd/lib/typography/Title";
import { Flex } from "antd";

interface IProps {}

export const AccessDenied: FC<IProps> = (): JSX.Element => {
  return (
    <SystemLayout>
      <Flex gap="small" vertical>
        <Title> Access Denied </Title>
      </Flex>
    </SystemLayout>
  );
};
