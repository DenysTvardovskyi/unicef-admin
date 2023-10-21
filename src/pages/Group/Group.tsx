import { FC, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Skeleton,
} from "antd";
import { useParams } from "react-router-dom";
import { useApi, useNotification } from "../../hooks";
import { IGroup } from "../../models/group";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { List } from "../../components";
import { useUsersConfig } from "../Users/useUsersConfig";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useTableData } from "./useTableData";

const { Option } = Select;

interface IProps {}

const getDate = (date: any) => new Date(date).toLocaleDateString(
  "en-US",
  { year: "numeric", month: "2-digit", day: "numeric" },
);

export const Group: FC<IProps> = (): JSX.Element => {
  const { groupId } = useParams();
  const api = useApi();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notification = useNotification();
  const [ groupData, setGroupData ] = useState<IGroup>();
  const { days, tableLabels, conversationStates, freequency } = useTableData();

  useEffect(() => {
    if (groupId) {
      api.groups.one({ id: groupId }).then(group => setGroupData(group.items[0]));
    }
  }, [ groupId ]);

  const handleSave = (body: any) => {
    try {
      api.groups.update({ id: groupId, ...body }).then((result) => {
        setGroupData(result);
        notification.success("Saved");
      });
    } catch (e: any) {
      notification.error(`Saving failed ${e.message}`);
    }
  };

  const renderView = (record: any) => <Button onClick={() => navigate("/user/" + record.key)}>View</Button>;
  const renderSubscription = (record: any) => record ? <CheckOutlined style={{ color: "green" }} /> :
    <CloseOutlined style={{ color: "red" }} />;

  const config = useUsersConfig({ onView: renderView, onSub: renderSubscription });

  return (
    <Flex vertical>
      <Row gutter={[ 24, 24 ]} justify={"center"}>
        <Col xs={24} sm={24} md={24} lg={16} xl={8}>
          <Skeleton loading={!groupData} active={true}>
            <Title>{groupData?.name}</Title>
          </Skeleton>

          <Flex vertical gap={"middle"}>
            <Skeleton loading={!groupData} active={true}>
              <Card title={tableLabels.customersCount}>
                <Title level={2}>{groupData?.customersCount}</Title>
              </Card>
            </Skeleton>
            <Skeleton loading={!groupData} active={true}>
              <Card title={tableLabels.createdAt}>
                <Title level={2}>{getDate(groupData?.createdAt)}</Title>
              </Card>
            </Skeleton>
            <Skeleton loading={!groupData} active={true}>
              {groupData?.updatedAt &&
                <Card title={tableLabels.updatedAt}>
                  <Title level={2}>{getDate(groupData?.updatedAt)}</Title>
                </Card>}
            </Skeleton>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={8}>
          <Skeleton loading={!groupData} active={true}>
            <Form
              layout="vertical"
              initialValues={{ ...groupData }}
              onFinish={data => handleSave(data)}
            >
              <Title>Edit</Title>
              <Form.Item name="name" label={tableLabels.name}>
                <Input />
              </Form.Item>
              <Form.Item name="description" label={tableLabels.description}>
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
                  <Option value="Daily" label={freequency.daily}>
                    {freequency.daily}
                  </Option>
                  <Option value="Weekly" label={freequency.monthly}>
                    {freequency.monthly}
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item name="conversationStates" label={tableLabels.conversationStates}>
                <Select
                  mode="multiple"
                >
                  {conversationStates.map((item: any) =>
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
          </Skeleton>
        </Col>
      </Row>
      <Flex justify={"center"} vertical>
        <Title level={3} style={{ margin: 0 }}>{t("users.title")}</Title>
        <List
          resource="groupUsers"
          apiConfig={{ id: groupId }}
          config={config}
        />
      </Flex>
    </Flex>
  );
};