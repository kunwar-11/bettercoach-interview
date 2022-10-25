import React from "react";

export const ModalSessionInfo = ({ data }) => {
  const { id, sessionPeriod, invoiceType } = data;
  return (
    <div>
      <h4>Session#{id}</h4>
      <h5>{sessionPeriod}</h5>
      <p>InvoiceType:-{invoiceType}</p>
    </div>
  );
};
