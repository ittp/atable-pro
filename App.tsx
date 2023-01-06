import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio
} from "@ant-design/pro-components";
import Form from "antd/es/form/Form";

import React, { useState } from "react";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let DeviceTypes = {
  models: [
    {
      label: "",
      value: ""
    }
  ],
  types: [
    {
      label: "Оригинальный",
      value: "1"
    },
    {
      label: "Совместимый",
      value: "2"
    },
    {
      label: "Другой",
      value: "0"
    }
  ]
};

type DataAddress = {
  city?: string;
  street?: string;
  full?: { city: DataAddress["city"]; street: DataAddress["street"] };
};

type DataSourceType = {
  id: React.Key;
  number?: number;
  state?: string;
  title?: string;

  client?: string;
  address?: DataAddress["full"];

  created_at?: string;
  update_at?: string;

  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    number: 424442,
    title: "Настройка ЭЦП",
    state: "open",
    client: "k-transp1",
    created_at: "1590486176000",
    update_at: "1590486176000"
  },
  {
    id: 624691229,
    number: 424444,
    title: "Kyocera",
    address: {
      city: "1",
      street: "1"
    },
    state: "closed",
    created_at: "1590481162000",
    update_at: "1590481162000"
  }
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">(
    "bottom"
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "Номер заявки",
      dataIndex: "number",
      tooltip: "Номер заявки",
      readonly: true,
      width: "15%"
    },
    {
      title: "title",
      dataIndex: "title",
      tooltip: "Title",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: "此项为必填项" }] : []
        };
      },
      // 第一行不允许编辑
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: "15%"
    },

    {
      title: "State",
      key: "state",
      dataIndex: "state",
      valueType: "select",
      valueEnum: {
        queue: {
          text: "В очереди",
          status: "Queue"
        },
        assigned: {
          text: "Назначена",
          status: "Assigned"
        },
        open: {
          text: "Открыта",
          status: "Opened"
        },
        closed: {
          text: "Выполнена",
          status: "Completed"
        },
        progress: {
          text: "В работе",
          status: "In progress"
        }
      }
    },
    {
      title: "Адрес",
      dataIndex: "address",
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || "", "city"]) === "不好玩") {
          return {
            disabled: true
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true
          };
        }
        return {};
      }
    },
    {
      title: "created_at",
      dataIndex: "created_at",
      valueType: "date"
    },
    {
      title: "Actions",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Delete
        </a>
      ]
    }
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="Devices"
        maxLength={5}
        scroll={{
          x: 960
        }}
        recordCreatorProps={
          position !== "hidden"
            ? {
                position: position as "top",
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) })
              }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value)
            }}
            options={[
              {
                label: "Назначенные",
                value: "top"
              },
              {
                label: "Открытые",
                value: "bottom"
              },
              {
                label: "Выполненные",
                value: "hidden"
              },
              {
                label: "Созданные",
                value: "hidden"
              }
            ]}
          />
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys
        }}
      />

      <Form></Form>

      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: "100%"
            }
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
