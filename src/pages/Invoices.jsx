import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { InvoicesHeader, InvoicesList } from "../component";
import InvoiceDetails from "./InvoiceDetails";
import { Pagination, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const FIND_INVOICES = gql`
  query FindInvoices($page: Int!, $status: String, $invoiceId: Int) {
    findInvoices(page: $page, status: $status, invoiceId: $invoiceId) {
      totalCount
      currentPage
      status
      statusTypes
      invoices {
        id
        status
        clientNumber
        invoiceNumber
        reportedSessionIds
        companyName
        nameOfCoach
        downloadUrl
      }
      errors
      status
    }
  }
`;

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 64,
    }}
    spin
  />
);

export const Invoices = () => {
  const navigate = useNavigate();

  const { loading, data, error, refetch } = useQuery(FIND_INVOICES, {
    variables: { page: 1 },
    context: {
      headers: {
        "X-BC-Authorisation": window?.sessionStorage?.getItem("authKey"),
      },
    },
  });
  console.log(data, loading, error);
  React.useEffect(() => {
    console.log("mounted");
    if (window?.sessionStorage?.getItem("authKey")) {
    } else {
      navigate("/login");
    }
  }, [navigate]);
  if (window.location.search) return <InvoiceDetails />;
  const pageChangeHandler = (page) => {
    refetch({ page });
  };

  if (loading)
    return (
      <div className="preloader_parent">
        <Spin indicator={antIcon} style={{ color: "darkgray" }} />
      </div>
    );

  return (
    <div>
      <InvoicesHeader
        status={data?.findInvoices?.statusTypes}
        refetch={refetch}
      />
      {/* {displaying list of invoices} */}
      <InvoicesList invoices={data?.findInvoices?.invoices} />
      {/* {data?.findInvoices?.invoices?.map((each) => (
        <h1 key={each?.id}>{each?.poNumber}</h1>
      ))} */}
      <div className="invoice_header footer">
        <Pagination
          current={data?.findInvoices?.currentPage}
          total={data?.findInvoices?.totalCount}
          onChange={pageChangeHandler}
          pageSize={25}
        />
      </div>
    </div>
  );
};
