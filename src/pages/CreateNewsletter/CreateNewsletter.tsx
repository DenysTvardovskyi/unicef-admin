import { FC } from "react";
import { Button, Col, Flex, Form, Input, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { useApi, useNotification } from "../../hooks";
import { useTranslation } from "react-i18next";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;

interface IProps {}

export const CreateNewsletter: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();

  const api = useApi();
  const notification = useNotification();
  const navigate = useNavigate();

  const handleCreate = (body: any) => {
    try {
      api.newsletters.create({ ...body }).then(() => {
        notification.success("Success");
        navigate("/newsletter/all");
      });
    } catch (e: any) {
      notification.error(e);
    }
  };

  const initialValues = {
    type: null,
    content: null,
    frequency: null,
    groupId: null,
  };

  return (
    <Flex gap="small" vertical>
      <Row gutter={[ 24, 24 ]} justify={"center"}>
        <Col xs={24} sm={24} md={24} lg={16} xl={8}>
          <Form
            layout="vertical"
            onFinish={data => handleCreate(data)}
            initialValues={initialValues}
          >
            <Title>Create newsletter</Title>
            <Form.Item required name="name" label={"Name"}>
              <Input />
            </Form.Item>
            <Form.Item required name="content" label={"content"}>
              <TextArea rows={2} />
            </Form.Item>
            <Flex gap={"small"} vertical style={{ width: "100%" }}>
              <Form.Item name="type" label={"type"}>
                <Select
                  placeholder="Select Type"
                >
                  <Option value="text" label="Text">
                    Text
                  </Option>
                  <Option value="exercice" label="Exercice">
                    Exercice
                  </Option>
                  <Option value="advice" label="Advice">
                    Advice
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item name="frequency" label={"frequency"}>
                <Select>
                  <Option value="daily" label="Daily">
                    Daily
                  </Option>
                  <Option value="weekly" label="Weekly">
                    Weekly
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">{t("save")}</Button>
              </Form.Item>
            </Flex>
          </Form>
        </Col>
      </Row>
    </Flex>
  );
};