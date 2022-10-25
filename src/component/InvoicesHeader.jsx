import React from "react";
import { Select } from "antd";
import "../styles/invoice.css";
const { Option } = Select;
let key = 0;
export const InvoicesHeader = ({ status, refetch }) => {
  const statusSelectionHandler = (value) => {
    console.log(value);
    // if (value === "all") {
    //   refetch({ status: "" });
    // } else {
    refetch({ status: value, page: 1 });
    // }
  };
  return (
    <div className="invoice_header">
      <h1>Invoices</h1>
      <Select
        name=""
        id=""
        onChange={statusSelectionHandler}
        defaultValue="All"
      >
        <Option value="all">All</Option>
        {status.map((each) => (
          <Option key={++key} value={each}>
            {each}
          </Option>
        ))}
      </Select>
    </div>
  );
};
