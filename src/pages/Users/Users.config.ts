export const UsersConfig: any = ({ onView, onSub }) => {
  return (
    [
      {
        title: "ID",
        dataIndex: "id",
        sorter: (a, b) => a.id - b.id,
        key: "id",
      },
      {
        title: "Total Kids",
        dataIndex: "kids",
        align: "center",
        sorter: (a: any, b: any) => a.kids.length - b.kids.length,
        key: "kids",
        render: (record) => record.length,
      },
      {
        title: "Bot Type",
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
        title: "Subscribed",
        dataIndex: "isSubscribed",
        key: "isSubscribed",
        align: "center",
        render: (record) => onSub(record),
      },
      {
        title: "Frequency",
        dataIndex: "recommendationFrequency",
        key: "recommendationFrequency",
      },
      {
        title: "Region",
        dataIndex: "region",
        key: "region",
        render: (record) => record.name,
      },
      {
        title: "Actions",
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