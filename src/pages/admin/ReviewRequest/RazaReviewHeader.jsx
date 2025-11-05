import React, { useState } from 'react';
import CommentIcon from '../../../components/svgIcons/CommentIcon';
import RejectModel from './RejectModel';
import {
  acceptRequestAPI,
  generateDocuments,
  getRequestById,
} from '../../../services/arazService';
import { getDocumentPreview } from '../../../services/documentService';
import RoundSpinner from '../../../components/common/RoundSpinner';
import PrintIcon from '../../../components/svgIcons/PrintIcon';

const RazaReviewHeader = ({
  requestData,
  manzooriDoc,
  istershaadDoc,
  onGenerateDocuments,
  docId,
}) => {
  const [updatedData, setUpdatedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUpdatedRequestData = async () => {
    try {
      const result = await getRequestById(requestData?.id);
      onGenerateDocuments(result.data || null);
      setUpdatedData(result.data || null);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  };

  const handleAccept = async () => {
    try {
      await acceptRequestAPI(requestData?.id, { status: 'completed' });
    } catch (e) {
      console.log('error:', e);
    }
  };

  const handleGenerateDocuments = async () => {
    try {
      const rezaID = requestData?.id;
      await generateDocuments(rezaID);
      await fetchUpdatedRequestData();
    } catch (e) {
      console.log('error:', e);
    }
  };

  const handlePrint = async () => {
    try {
      setLoading(true);
      const result = await getDocumentPreview(docId, false);
      const pdfBlob = new Blob(
        [Uint8Array.from(atob(result?.data), (c) => c.charCodeAt(0))],
        { type: 'application/pdf' }
      );
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setLoading(false);
      window.open(pdfUrl, '_blank');
    } catch (e) {
      setLoading(false);
      console.log('error:', e);
    }
  };
  return (
    <>
      <div className="raza-progress-head mb-4">
        <div className="row">
          <div className="col-sm-6">
            <div className="rph-left mb-3 mb-sm-0">
              <div className="rph-group">
                <p className="text-primary">Araz ID</p>
                <p>{requestData?.id || ''}</p>
              </div>
              <div className="rph-group">
                <p className="text-primary">Business name:</p>
                <p>-</p>
              </div>
              {/*<div className="rph-group circle-icon-btn">*/}
              {/*    <button className="btn p-0">*/}
              {/*        <svg*/}
              {/*            width="22"*/}
              {/*            height="22"*/}
              {/*            viewBox="0 0 22 22"*/}
              {/*            fill="none"*/}
              {/*            xmlns="http://www.w3.org/2000/svg"*/}
              {/*        >*/}
              {/*            <path*/}
              {/*                d="M9.9 7.7H12.1V5.5H9.9M11 19.8C6.149 19.8 2.2 15.851 2.2 11C2.2 6.149 6.149 2.2 11 2.2C15.851 2.2 19.8 6.149 19.8 11C19.8 15.851 15.851 19.8 11 19.8ZM11 0C9.55546 0 8.12506 0.284523 6.79048 0.837325C5.4559 1.39013 4.24327 2.20038 3.22183 3.22183C1.15893 5.28473 0 8.08262 0 11C0 13.9174 1.15893 16.7153 3.22183 18.7782C4.24327 19.7996 5.4559 20.6099 6.79048 21.1627C8.12506 21.7155 9.55546 22 11 22C13.9174 22 16.7153 20.8411 18.7782 18.7782C20.8411 16.7153 22 13.9174 22 11C22 9.55546 21.7155 8.12506 21.1627 6.79048C20.6099 5.4559 19.7996 4.24327 18.7782 3.22183C17.7567 2.20038 16.5441 1.39013 15.2095 0.837325C13.8749 0.284523 12.4445 0 11 0ZM9.9 16.5H12.1V9.9H9.9V16.5Z"*/}
              {/*                fill="#317470"*/}
              {/*            />*/}
              {/*        </svg>*/}
              {/*    </button>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="col-sm-6">
            <div className="rph-right">
              <div className="rph-group circle-icon-btn gap-3 d-flex justify-content-end align-items-center flex-wrap">
                <button
                  className="btn btn-primary2 w-auto shadow-none gap-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Generate Istershaad and Manzoori Documents"
                  disabled={istershaadDoc && manzooriDoc}
                  onClick={() => handleGenerateDocuments()}
                >
                  <svg
                    width="21"
                    height="23"
                    viewBox="0 0 21 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5323 17.8118L17.0402 21.206L16.0519 20.2423L17.8419 18.497H11.0994V17.1265H17.8419L16.0519 15.3812L17.0402 14.4176L20.5323 17.8118ZM14.2741 20.9118L15.6797 22.2823H0.942871V0.35376H13.187L19.2157 6.23207V14.0912L17.8101 12.7207V7.20644H12.1877V1.7243H2.34847V20.9118H14.2741ZM13.5933 5.8359H16.8108L13.5933 2.69866V5.8359Z"
                      fill="white"
                    />
                  </svg>
                  Generate
                </button>
                <button className="btn icon-btn p-0" onClick={handlePrint}>
                  {loading ? (
                    <RoundSpinner size="large" color="success" />
                  ) : (
                    <PrintIcon />
                  )}
                </button>
                {/*<button className="btn p-0">*/}
                {/*    <svg*/}
                {/*        width="23"*/}
                {/*        height="20"*/}
                {/*        viewBox="0 0 23 20"*/}
                {/*        fill="none"*/}
                {/*        xmlns="http://www.w3.org/2000/svg"*/}
                {/*    >*/}
                {/*        <path*/}
                {/*            d="M0 18.4615H23V20H0V18.4615ZM19.2214 5.38462C19.8786 4.76923 19.8786 3.84615 19.2214 3.23077L16.2643 0.461538C15.6071 -0.153846 14.6214 -0.153846 13.9643 0.461538L1.64286 12V16.9231H6.9L19.2214 5.38462ZM15.1143 1.53846L18.0714 4.30769L15.6071 6.61539L12.65 3.84615L15.1143 1.53846ZM3.28571 15.3846V12.6154L11.5 4.92308L14.4571 7.69231L6.24286 15.3846H3.28571Z"*/}
                {/*            fill="#317470"*/}
                {/*        />*/}
                {/*    </svg>*/}
                {/*</button>*/}
                <button
                  className="btn p-0"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#admin_comments"
                  aria-controls="offcanvasRight"
                >
                  <CommentIcon />
                </button>
                <button
                  className="btn shadow-none p-0 mx-2 text-danger"
                  data-bs-target="#Reject_Button"
                  data-bs-toggle="modal"
                >
                  Reject
                </button>
                <button
                  className="btn btn-primary w-auto"
                  data-bs-toggle="modal"
                  data-bs-target="#Sent_Successfully"
                  onClick={() => handleAccept()}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RejectModel requestData={requestData} />
    </>
  );
};

export default RazaReviewHeader;
