import { TablePaginationConfig } from "antd";
import { FilterValue } from "antd/lib/table/interface";

export interface ITableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}