import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { ModalInvoiceInfo, ModalSessionInfo } from "./index";

const FIND_REPORTED_SESSION = gql`
  query FindReportedSession($reportedSessionIds: [Int!], $page: Int!) {
    findReportedSessions(reportedSessionIds: $reportedSessionIds, page: $page) {
      currentPage
      reportedSessions {
        id
        creditNotes {
          creditNoteNumber
          grossAmount
          referenceNumber
        }
        invoicingDetails {
          accountName
          accountNumber
          id
          invoiceId
          coachName
          clientNumber
        }
        sessionDetails {
          id
          invoiceType
          sessionPeriod
          totalInvoicedGross
          totalInvoicedNet
        }
      }
    }
  }
`;

export const SessionReportModal = ({ invoiceInfo, setInvoiceInfo }) => {
  const { data, loading } = useQuery(FIND_REPORTED_SESSION, {
    variables: {
      reportedSessionIds: invoiceInfo?.reportedSessionIds,
      page: 1,
    },
    context: {
      headers: {
        "X-BC-Authorisation": window?.sessionStorage?.getItem("authKey"),
      },
    },
  });
  const ref = useRef();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      //   return;
      // }

      setInvoiceInfo(null);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [setInvoiceInfo]);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="modal_parent" onClick={() => setInvoiceInfo(null)}>
      <div
        className="modal_body"
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal_body_header">
          <h2>Session Details</h2>
        </div>
        <div>
          {data?.findReportedSessions?.reportedSessions?.map(
            (eachSession, index) => (
              <div
                key={eachSession?.id}
                className={`modal_sessionDetails ${
                  index % 2 !== 0 ? "" : "bg-off"
                }`}
              >
                <ModalInvoiceInfo data={eachSession?.invoicingDetails} />
                <ModalSessionInfo data={eachSession?.sessionDetails} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
