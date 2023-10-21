import { FC } from "react";
import { Button, Flex, Result } from "antd";
import { constants } from "../../styles/constants";
import { QuestionOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";

interface IProps {}

export const NotFound: FC<IProps> = (): JSX.Element => {
    const {t} = useTranslation();
  return (
    <Flex style={{ width: "100%", height: "100%" }} justify={"center"} align={"center"}>
      <Result
        title="404"
        icon={<QuestionOutlined style={{ color: constants.blue }} />}
        subTitle={t("not-found.title")}
        extra={<Link to="/"><Button type="primary" style={{ background: constants.blue }}>{t("backHome")}</Button></Link>}
      />
    </Flex>
  );
};
