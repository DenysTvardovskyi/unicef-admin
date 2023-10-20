import { FC } from "react";
import { System as SystemLayout } from "../../layouts";
import { useTranslation } from "react-i18next";
import { useLoader, useNotification } from "../../hooks";
import {Button, Card, Flex, Skeleton, Table} from "antd";
import { ILoaderTask } from "../../components/Loader/Loader";
import Title from "antd/es/typography/Title";
import {Column, Pie} from '@ant-design/plots';
import {AnalyticsBar} from "./components/AnalyticsBar";

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

  const DemoPie = () => {
    const data = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其他',
        value: 5,
      },
    ];
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
    };
    return <Pie {...config} />;
  };

  const DemoColumn = () => {
    const data = [
      {
        type: '家具家电',
        sales: 38,
      },
      {
        type: '粮油副食',
        sales: 52,
      },
      {
        type: '生鲜水果',
        sales: 61,
      },
      {
        type: '美容洗护',
        sales: 145,
      },
      {
        type: '母婴用品',
        sales: 48,
      },
      {
        type: '进口食品',
        sales: 38,
      },
      {
        type: '食品饮料',
        sales: 38,
      },
      {
        type: '家庭清洁',
        sales: 38,
      },
    ];
    const config = {
      data,
      xField: 'type',
      yField: 'sales',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle',
        // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: '类别',
        },
        sales: {
          alias: '销售额',
        },
      },
    };
    return <Column {...config} />;
  };

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '3',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '4',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '5',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <SystemLayout>
      <Flex gap={"small"} vertical>
        <Title>{t("home.title")}</Title>
        <AnalyticsBar/>
        <Flex gap={"middle"}>
          <Flex style={{width: "50%"}}>
            <Table style={{width: "100%"}} dataSource={dataSource} columns={columns} pagination={false}/>
          </Flex>
          <Flex gap={"middle"} style={{width: "50%"}}>
            <Card title="Card title" style={{width: "50%"}}>
              {DemoPie()}
            </Card>
            <Card title="Card title" style={{width: "50%"}}>
              {DemoColumn()}
            </Card>
          </Flex>
          {/*<Button type="primary" onClick={() => notification.error("Error")}>Error</Button>*/}
          {/*<Button type="primary" onClick={() => notification.info("Info")}>Info</Button>*/}
          {/*<Button type="primary" onClick={() => notification.success("Success")}>Success</Button>*/}
          {/*<Button type="primary" onClick={() => notification.warning("Warning")}>Warning</Button>*/}
        </Flex>
      </Flex>
    </SystemLayout>
  );
};