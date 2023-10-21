import {FC, useEffect, useState} from "react";
import {Card, Col, Flex, Result, Row, Select, Skeleton} from "antd";
import Title from "antd/es/typography/Title";
import {useTranslation} from "react-i18next";
import {useApi} from "../../hooks";
import {ICustomer} from "../../models/customer";
import {LineChart, PieChart} from "../../components";
import {FileSearchOutlined} from "@ant-design/icons";
import {constants} from "../../styles/constants";

interface IProps {}

export const ActivityAnalytics: FC<IProps> = (): JSX.Element => {
    const {t} = useTranslation()
    const api = useApi()
    const [ groups, setGroups ] = useState<any[]>([]);
    const [ selected, setSelected ] = useState<string>();
    const [ data, setData ] = useState<ICustomer[]>();

    useEffect(() => {
        // @ts-ignore
        api.groups.get({ params: { pagination: [ { pageSize: 1000000, page: 1 } ] } })
            .then((r: any) => setGroups(r.items.map(({id, name}: any) => ({value: id, label: name}))));

    }, []);

    console.log(groups)

    const loading = !groups;

    const handleChange = (id: any) => {
        setSelected(id)
        // @ts-ignore
        api.groups.customers({id, params: { pagination: [ { pageSize: 1000000, page: 1 }]}}).then((r) => setData([...r.items]))
    }

    return (
        <Flex gap="small" vertical>
            <Flex vertical>
                <Title>{t('analytics.activity.title')}</Title>
                <Flex align={"center"} justify={"space-between"}>
                    <Select
                        placeholder={"Select a group"}
                        style={{ width: "280px" }}
                        onChange={handleChange}
                        value={selected}
                        options={groups}
                    />
                    {selected && <Title style={{margin: 0}} level={5}>Users in group: {data?.length}</Title>}
                </Flex>
            </Flex>
            {data?.length ? <Row gutter={[16, 16]}>
                <Skeleton loading={loading} active={true}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Card title={"Subscribed"}>
                            <PieChart data={data} keyword={"isSubscribed"}/>
                        </Card>
                    </Col>
                </Skeleton>
                <Skeleton loading={loading} active={true}>
                    <Title></Title>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Card title={"Conversation state"}>
                            <LineChart data={data} keyword={"conversationState"}/>
                        </Card>
                    </Col>
                </Skeleton>
            </Row> : <Result icon={< FileSearchOutlined color={constants.blue}/>} title={selected ? "Please select another group" : "Please select a group"} />}
        </Flex>
    );
};