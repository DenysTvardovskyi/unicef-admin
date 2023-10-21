import { FC } from "react";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import {useTranslation} from "react-i18next";

interface IProps {}

export const TrafficAnalytics: FC<IProps> = (): JSX.Element => {
    const {t} = useTranslation()

  return (
    <Flex gap="small" vertical>
        <Title>{t('analytics.traffic.title')}</Title>
    </Flex>
  );
};