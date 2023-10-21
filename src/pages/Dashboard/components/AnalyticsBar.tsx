import {Card, Col, Row, Skeleton} from "antd";
import Title from "antd/es/typography/Title";
import {useTranslation} from "react-i18next";
import {IData} from "../../../models/data";

interface IProps {
    data: IData | undefined
}

const cartStyles = {
    width: "100%",
}

const cartContentStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

export const AnalyticsBar = (props: IProps) => {
    const {t} = useTranslation()
    const data = props.data
    return (
        <Skeleton loading={!data} active style={cartContentStyles}>
            <Row gutter={[16, 16]}>
                {
                    data ?
                    Object.keys(data).map(key =>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Card title={t(`dashboard.${key}`)} style={cartStyles}>
                                <Title level={2}>
                                    {data[key].totalCount}
                                </Title>
                            </Card>
                        </Col>
                    ): <></>
                }
            </Row>
        </Skeleton>

    )
}