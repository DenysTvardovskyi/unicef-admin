import { FC } from "react";
import { System as SystemLayout } from "../../layouts";
import { useTranslation } from "react-i18next";
import { useLoader, useNotification } from "../../hooks";
import { Button, Flex } from "antd";
import { ILoaderTask } from "../../components/Loader/Loader";
import Title from "antd/es/typography/Title";

interface IProps {}

export const Dashboard: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const notification = useNotification();
  const loader = useLoader();

  const handleLoader = () => {
    const task: ILoaderTask = loader.create("Loader");
    loader.start(task);
    setTimeout(() => {
      loader.stop(task);
    }, 3000);
  };

  return (
    <SystemLayout>
      <Flex gap="small" vertical>
        <Title>{t("home.title")}</Title>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
        <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
        <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
        <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
        <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
      </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => notification.error("Error")}>Error</Button>
          <Button type="primary" onClick={() => notification.info("Info")}>Info</Button>
          <Button type="primary" onClick={() => notification.success("Success")}>Success</Button>
          <Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>
        </Flex>

        <Flex gap="small">
          <Button type="primary" onClick={handleLoader}>Loader</Button>
        </Flex>
      </Flex>
    </SystemLayout>
  );
};