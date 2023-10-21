import { FC } from "react";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Flex, Result } from "antd";
import { constants } from "../../styles/constants";
import {useTranslation} from "react-i18next";

interface IProps {}

export const AccessDenied: FC<IProps> = (): JSX.Element => {
    const {t} = useTranslation()
  return (

    <Flex style={{ width: "100%", height: "100%" }} justify={"center"} align={"center"}>
      <Result
        title="403"
        icon={<CloseOutlined style={{ color: constants.red }}/>}
        subTitle={t("no-auth.message") }
        extra={<Link to={"/"}><Button type="primary" style={{ background: constants.blue }}>{t("backHome") }</Button></Link>}
      />
    </Flex>
  );
};
