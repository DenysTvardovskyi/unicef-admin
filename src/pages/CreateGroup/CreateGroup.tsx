import { FC } from "react";
import { Button, Col, Flex, Form, Input, InputNumber, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import { useApi, useNotification } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useTableData } from "../Group/useTableData";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface IProps {}

export const CreateGroup: FC<IProps> = (): JSX.Element => {
  const api = useApi();
  const navigate = useNavigate();
  const notification = useNotification();
  const { days, tableLabels, conversationStates } = useTableData();
  const { t } = useTranslation();

  const handleCreate = (body: any) => {
    try {
      api.groups.create({ ...body }).then((r) => {
        notification.success("Success");
        navigate("/group/" + r.id);
      });
    } catch (e: any) {
      notification.error(e);
    }
  };

  const initialValues = {
    name: null,
    description: null,
    minChildAge: null,
    maxChildAge: null,
    minChildCount: null,
    maxChildCount: null,
    customerTraffics: [],
    recommendationDays: [],
    recommendationFrequencies: [],
    conversationStates: [],
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
            <Title>{t("groups.createTitle")}</Title>
            <Form.Item required name="name" label={tableLabels.name}>
              <Input />
            </Form.Item>
            <Form.Item required name="description" label={tableLabels.description}>
              <TextArea rows={2} />
            </Form.Item>

            <Flex gap={"small"} style={{ width: "100%" }}>
              <Form.Item name="maxChildAge" label={tableLabels.maxChildAge}>
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item name="minChildAge" label={tableLabels.minChildAge}>
                <InputNumber min={0} />
              </Form.Item>
            </Flex>

            <Flex gap={"small"} style={{ width: "100%" }}>
              <Form.Item name="maxChildCount" label={tableLabels.maxChildCount}>
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item name="minChildCount" label={tableLabels.minChildCount}>
                <InputNumber min={0} />
              </Form.Item>
            </Flex>

            <Form.Item name="customerTraffics" label={tableLabels.customerTraffics}>
              <Select
                mode="multiple"
                placeholder="Select social network"
              >
                <Option value="Telegram" label="Telegram">
                  Telegram
                </Option>
                <Option value="Viber" label="Viber">
                  Viber
                </Option>
              </Select>
            </Form.Item>

            <Form.Item name="recommendationDays" label={tableLabels.recommendationDays}>
              <Select
                mode="multiple"
              >
                {days.map(item =>
                  <Option value={item.key} label={item.label}>
                    {item.label}
                  </Option>,
                )}
              </Select>
            </Form.Item>

            <Form.Item name="recommendationFrequencies" label={tableLabels.recommendationFrequencies}>
              <Select
                mode="multiple"
              >
                <Option value="Daily" label="Daily">
                  Daily
                </Option>
                <Option value="Weekly" label="Weekly">
                  Weekly
                </Option>
              </Select>
            </Form.Item>

            <Form.Item name="conversationStates" label={tableLabels.conversationStates}>
              <Select
                mode="multiple"
              >
                {conversationStates.map(item =>
                  <Option value={item.key} label={item.label}>
                    {item.label}
                  </Option>,
                )}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">{t("save")}</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Flex>

  );
};