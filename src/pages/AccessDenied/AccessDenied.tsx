import { FC } from "react";
import {Link} from "react-router-dom";
import { CloseOutlined} from "@ant-design/icons";
import {Button, Flex, Result} from "antd";
import { System as SystemLayout } from "../../layouts";
import {constants} from "../../styles/constants";

interface IProps {}

export const AccessDenied: FC<IProps> = (): JSX.Element => {
  return (
    <SystemLayout>
      <Flex style={{width: "100%", height: "100%"}} justify={"center"} align={"center"}>
          <Result
              title="403"
              icon={<CloseOutlined style={{color: constants.red}} />}
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Link to={"/"}><Button type="primary" style={{background: constants.blue}}>Back Home</Button></Link>}
          />
      </Flex>
    </SystemLayout>
  );
};
