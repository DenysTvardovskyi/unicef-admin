import {useTranslation} from "react-i18next";

export const useUsersConfig: any = ({ onView, onSub }) => {
    const {t} = useTranslation()
  return (
    [
      {
        title: "ID",
        dataIndex: "id",
        sorter: (a, b) => a.id - b.id,
        key: "id",
      },
      {
        title: t("users.totalKids"),
        dataIndex: "kids",
        align: "center",
        sorter: (a: any, b: any) => a.kids.length - b.kids.length,
        key: "kids",
        render: (record) => record.length,
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
        render: (record) => onSub(record),
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
        render: (record) => record.name,
      },
      {
        title: t("users.actions"),
        dataIndex: "",
        key: "x",
        fixed: "right",
        width: "100px",
        align: "center",
        render: (record) => onView(record),
      },
    ]
  );
};