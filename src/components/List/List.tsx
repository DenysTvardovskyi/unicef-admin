import { FC, useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { FilterValue, TablePaginationConfig } from "antd/es/table/interface";
import { useApi } from "../../hooks";

interface IProps<T> {
  config: ColumnsType<T>;
  pagination?: false | TablePaginationConfig;
  search?: boolean;
  disabled?: boolean;
  apiConfig?: any;
  resource: string;
  components?: any;
  searchConfig?: {
    placeholder: string;
  };
}

interface IQueryParams {
  filters: any[];
  sorters: any[];
  pagination: {
    page: number;
    pageSize: number;
  };
}

const ORDER_QUERY: { ascend: string, descend: string } = {
  ascend: "asc",
  descend: "desc",
};

type TQuery = "ascend" | "descend";

export const List: FC<IProps<any>> = (props: IProps<any>): JSX.Element => {
  const { config, resource, searchConfig, search = false, disabled = false, ...rest } = props;
  const api = useApi();
  const [ dataSource, setDataSource ] = useState<object[]>([]);
  const [ total, setTotal ] = useState<number>();
  const [ params, setParams ] = useState<IQueryParams>({
    pagination: {
      page: 1,
      pageSize: 10,
    },
    filters: [],
    sorters: [],
  });

  useEffect(() => {
    // @ts-ignore
    api[resource].get({
      ...rest.apiConfig,
      params: { ...params, pagination: [ params.pagination ] },
    })
      .then(({ items, totalCount }: any) => {
        setTotal(totalCount);
        setDataSource(items.map((item: any) => ({ ...item, key: item.id })));
      });
  }, [ params ]);

  const onChange: TableProps<any>["onChange"] = (pagination, filters, sorter, extra): void => {
    console.log(pagination);
    if (extra.action === "sort") {
      handleSort(sorter);
    }

    if (extra.action === "filter") {
      handleFilter(filters);
    }
  };

  const handleFilter = (filters: Record<string, FilterValue | null>): void => {
    const columnName = Object.keys(filters)[0];

    const fieldId: number = params.filters?.findIndex((item) => item[columnName]);

    if (fieldId === -1) {
      setParams({ ...params, filters: [ ...params.filters, filters ] });
    } else {
      params.filters[fieldId][columnName] = filters[columnName];

      if (filters[columnName] === null) {
        params.filters.splice(fieldId, 1);
      }

      setParams({ ...params, filters: params.filters });
    }
  };

  const handleSort = (sorter: object | []): void => {
    if (sorter.constructor === Array) {
      sorter = [ ...sorter ];
    } else {
      sorter = [ sorter ];
    }

    (sorter as { field: string, order: TQuery }[]).map((sort) => {
      const fieldId: number = params.sorters?.findIndex((item) => item[sort.field]) ?? -1;

      if (fieldId === -1) {
        setParams({ ...params, sorters: [ ...params.sorters, { [sort.field]: ORDER_QUERY[sort.order] } ] });
      } else {
        params.sorters[fieldId][sort.field] = ORDER_QUERY[sort.order];

        if (!sort.order) {
          params.sorters.splice(fieldId, 1);
        }

        setParams({
          ...params,
          sorters: filterUnusedSortColumns(params.sorters, sorter as { field: string, order: string }[]),
        });
      }
    });
  };

  const filterUnusedSortColumns = (arr: any[], sorter: { field: string, order: string }[]): any[] => {
    return arr.filter((param) => (sorter).some((item) => item.field === Object.keys(param)[0]));
  };

  const onPaginationChange = (page: number, pageSize: number): void => {
    setParams({ ...params, pagination: { page, pageSize } });
  };

  return (
    <Table
      {...rest}
      loading={!dataSource.length}
      columns={config}
      pagination={{ ...params.pagination, total, onChange: onPaginationChange }}
      dataSource={dataSource}
      onChange={onChange}
      scroll={{ x: 1200 }}
    />
  );
};
