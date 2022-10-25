import { useQuery, gql } from "@apollo/client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Divider, Spin } from "antd";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const FIND_INVOICES = gql`
  query FindInvoices($page: Int!, $invoiceId: Int) {
    findInvoices(page: $page, invoiceId: $invoiceId) {
      invoices {
        id
        clientNumber
        invoiceNumber
        companyName
        nameOfCoach
        nameOfCoachee
        createdAt
        grossTotal
        netTotal
        periodOfService
        downloadUrl
        poNumber
        taxTotal
        taxPercentage
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

const InvoiceDetails = () => {
  const { data, loading } = useQuery(FIND_INVOICES, {
    variables: {
      page: 1,
      invoiceId: Number(window.location.search.split("=")[1]),
    },
    context: {
      headers: {
        "X-BC-Authorisation": window?.sessionStorage?.getItem("authKey"),
      },
    },
  });
  if (loading)
    return (
      <div className="preloader_parent">
        <Spin indicator={antIcon} style={{ color: "darkgray" }} />
      </div>
    );
  const {
    findInvoices: { invoices },
  } = data;
  return (
    <div className="invoice_details_container">
      <div className="invoice_details_body">
        <div className="invoice_details_header">
          <h1>{invoices[0]?.companyName}</h1>
          <Link
            to={`${invoices[0]?.downloadUrl}`}
            target="_blank"
            download
            style={{ color: "inherit" }}
          >
            <FontAwesomeIcon icon={faDownload} size="2xl" />
          </Link>
        </div>
        <Divider />
        <div className="invoice_details_info">
          <div>
            <p className="key">Invoice no.</p>
            <p className="value">{invoices[0]?.invoiceNumber}</p>
            <p className="key">Client no.</p>
            <p className="value">{invoices[0]?.clientNumber}</p>
            <p className="key">Period Of Service</p>
            <p className="value">{invoices[0]?.periodOfService}</p>
            <p className="key">Name Of Employee</p>
            <p className="value">{invoices[0]?.nameOfCoachee}</p>
          </div>
          <div>
            <p className="key">P/O no.</p>
            <p className="value">{invoices[0]?.poNumber}</p>
            <p className="key">Receipt Date</p>
            <p className="value">{invoices[0]?.createdAt}</p>
            <p className="key">Name Of Coach</p>
            <p className="value">{invoices[0]?.nameOfCoach}</p>
          </div>
        </div>
        <Divider />
        <div className="invoice_details_info">
          <div>
            <p>Net Amount:</p>
            <p>{invoices[0]?.taxPercentage}% VAT:</p>
          </div>
          <div>
            <p>EUR {invoices[0]?.netTotal}</p>
            <p>EUR {invoices[0]?.taxTotal}</p>
          </div>
        </div>
        <Divider />
        <div className="invoice_details_info">
          <p>Gross Amount:</p>
          <p>EUR {invoices[0]?.grossTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
