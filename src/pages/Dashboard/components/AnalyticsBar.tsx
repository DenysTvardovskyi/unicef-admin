import {Card, Flex, Skeleton} from "antd";
import Title from "antd/es/typography/Title";

interface IProps {}

const cartStyles = {
    width: "100%",
}

const cartContentStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid red"
}

const mocks = [
    {value: 900, label: "Number"},
    {value: 50, label: "Number"},
    {value: 1000, label: "Number"},
    {value: 23, label: "Number"},
    {value: 2300, label: "Number"},
    {value: 5010, label: "Number"},
]

const getAnalyticsCards = () =>
    mocks.map(data => <Card style={cartStyles}>
        <Skeleton loading={false} active style={cartContentStyles}>
            <Title level={2}>{data.value}</Title>
            <Title level={5}>{data.label}</Title>
        </Skeleton>
    </Card>
    )


export const AnalyticsBar = (props: IProps) => {
    return <Flex gap={"middle"}>
        {getAnalyticsCards()}
    </Flex>
}