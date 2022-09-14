import { DataTableColumn } from "naive-ui";
import { type RegisterResult } from "@wanin/shared/types";

export const playerListColumns: Array<DataTableColumn<RegisterResult>> = [
  {
    title: "ID",
    key: "id",
    sorter: "default",
  },
  {
    title: "手機號碼",
    key: "phone",
    sorter: "default",
    defaultFilterOptionValues: ["台灣", "香港", "澳門"],
    filterOptions: [
      {
        label: "台灣",
        value: "台灣",
      },
      {
        label: "香港",
        value: "香港",
      },
      {
        label: "澳門",
        value: "澳門",
      },
    ],
    filter(value: any, row: RegisterResult): any {
      return ~row.phone.indexOf(value);
    },
  },
  {
    title: "註冊時間",
    key: "created_at",
    sorter: "default",
  },
];
