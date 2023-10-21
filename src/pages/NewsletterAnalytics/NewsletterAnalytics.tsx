import { FC } from "react";
import {Flex, Result} from "antd";
import Title from "antd/es/typography/Title";
import {useTranslation} from "react-i18next";

interface IProps {}

export const NewsletterAnalytics: FC<IProps> = (): JSX.Element => {
    const {t} = useTranslation()
  return (
    <Flex gap="small" vertical>
        <Title>{t('analytics.newsletter.title')}</Title>
        <Result title={"Coming soon..."}/>
    </Flex>
  );
};