import React, { useState } from "react";
import { SessionReportModal } from "./SessionReportModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const InvoicesList = ({ invoices }) => {
  const [invoiceInfo, setInvoiceInfo] = useState(null);

  const reportedSessionHandler = (invoice) => {
    setInvoiceInfo(invoice);
  };

  const getDetailsHandler = (id) => {
    const url = new URL(window.location);
    url.searchParams.set("invoiceId", id);
    window.history.pushState({}, "", url);
    window.location.reload();
  };

  return (
    <div>
      {invoices.map((invoice, index) => (
        <div
          key={invoice?.id}
          className={`invoice_list_item ${index % 2 !== 0 ? "bg-off" : ""}`}
        >
          <div
            onClick={() => getDetailsHandler(invoice?.id)}
            style={{ cursor: "pointer" }}
          >
            <h2>{invoice?.companyName}</h2>
            <h3>
              {invoice?.nameOfCoach}
              <span style={{ color: "gray", paddingLeft: "0.5rem" }}>
                #{invoice?.clientNumber}
              </span>
            </h3>
            <p style={{ color: "gray" }}>invoice#{invoice?.invoiceNumber}</p>
          </div>

          <div className="icon_container">
            <Link
              to={`${invoice?.downloadUrl}`}
              target="_blank"
              download
              style={{ color: "inherit" }}
            >
              <FontAwesomeIcon
                icon={faDownload}
                size="xl"
                style={{ marginRight: "2rem", cursor: "pointer" }}
              />
            </Link>
            <FontAwesomeIcon
              icon={faEye}
              size="xl"
              style={{ cursor: "pointer" }}
              onClick={() => reportedSessionHandler(invoice)}
            />
          </div>
        </div>
      ))}
      {invoiceInfo && (
        <SessionReportModal
          invoiceInfo={invoiceInfo}
          setInvoiceInfo={setInvoiceInfo}
        />
      )}
    </div>
  );
};
