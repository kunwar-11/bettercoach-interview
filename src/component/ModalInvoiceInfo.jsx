import React from "react";

export const ModalInvoiceInfo = ({ data }) => {
  const { accountName, coachName, clientNumber, invoiceId } = data;
  return (
    <div>
      <h4>{accountName} </h4>
      <h5>
        {coachName} <span>#{clientNumber}</span>
      </h5>
      <p>Invoice#{invoiceId}</p>
    </div>
  );
};
