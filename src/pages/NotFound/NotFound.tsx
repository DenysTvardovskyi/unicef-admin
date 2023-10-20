import { FC } from "react";
import { Landing as LandingLayout } from "../../layouts";
import {Button, Flex, Result} from "antd";
import {constants} from "../../styles/constants";
import { QuestionOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

interface IProps {}

export const NotFound: FC<IProps> = (): JSX.Element => {
  return (
    <LandingLayout>
        <Flex style={{width: "100%", height: "100%"}} justify={"center"} align={"center"}>
            <Result
                title="404"
                icon={<QuestionOutlined style={{color: constants.blue}}/>}
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to="/"><Button type="primary" style={{background: constants.blue}}>Back Home</Button></Link>}
            />
        </Flex>
    </LandingLayout>
  );
};
