import { FC } from "react";
import { System as SystemLayout } from "../../layouts";
import {Button, Flex, Result} from "antd";
import { CloseOutlined} from "@ant-design/icons";
import {constants} from "../../styles/constants";

interface IProps {}

export const AccessDenied: FC<IProps> = (): JSX.Element => {
  return (
    <SystemLayout>
      <Flex gap="small" vertical>
          <Result
              title="403"
              icon={<CloseOutlined style={{color: constants.red}} />}
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary" style={{background: constants.blue}}>Back Home</Button>}
          />
      </Flex>
    </SystemLayout>
  );
};
