import {useTranslation} from "react-i18next";

export const useUsersConfig: any = ({ onView, onSub }: any) => {
    const {t} = useTranslation()
  return (
    [
      {
        title: "ID",
        dataIndex: "id",
        sorter: (a: any, b: any) => a.id - b.id,
        key: "id",
      },
      {
        title: "Bot Customer Id",
        dataIndex: "botCustomerId",
        sorter: (a: any, b: any) => a.id - b.id,
        key: "botCustomerId",
      },
      {
        title: t("users.totalKids"),
        dataIndex: "childrenCount",
        align: "center",
        sorter: (a: any, b: any) => a.childrenCount - b.childrenCount,
        key: "childrenCount",
      },
      {
        title: t("users.bot"),
        dataIndex: "botType",
        filters: [
          {
            text: "Telegram",
            value: "Telegram",
          },
          {
            text: "Viber",
            value: "Viber",
          },
        ],
        filterMode: "tree",
        onFilter: (value: string, record: any) => record.botType === value,
        key: "botType",
      },
      {
        title: t("users.subscription"),
        dataIndex: "isSubscribed",
        key: "isSubscribed",
        align: "center",
        render: (record: any) => onSub(record),
      },
      {
        title: t("users.frequency"),
        dataIndex: "recommendationFrequency",
        key: "recommendationFrequency",
      },
      {
        title: t("users.region"),
        dataIndex: "region",
        key: "region",
        render: (record: any) => record.name,
      },
      {
        title: t("users.actions"),
        dataIndex: "",
        key: "x",
        fixed: "right",
        width: "100px",
        align: "center",
        render: (record: any) => onView(record),
      },
    ]
  );
};