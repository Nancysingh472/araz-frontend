import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getDocumentById,
  getDocumentPreview,
} from '../../services/documentService';

const AdminPreviewDocument = ({ onchangeType, documentId, lastChangeType }) => {
  const [docData, setDocData] = useState(null);
  const [base64Data, setBase64Data] = useState('');

  const loadDocData = useCallback(async () => {
    try {
      const result = await getDocumentById(documentId);
      setDocData(result.data || null);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [documentId]);

  useEffect(() => {
    void loadDocData();
  }, [loadDocData]);

  const fetchPreviewData = useCallback(async () => {
    try {
      if (!documentId) {
        return;
      }
      const result = await getDocumentPreview(documentId, false);
      const byteCharacters = atob(result?.data || '');
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Create Blob and generate object URL
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);
      setBase64Data(blobUrl);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, []);

  useEffect(() => {
    fetchPreviewData();
  }, [fetchPreviewData]);

  return (
    <div className="preview-document-content px-20 kans">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h5>
                    <span
                      onClick={() => onchangeType('list')}
                      className="text-decoration-underline text-white text-regular"
                    >
                      Document
                    </span>
                    <span className="text-regular"> > </span>
                    <span
                      onClick={() => onchangeType(lastChangeType || 'edit', documentId)}
                      className="text-decoration-underline text-white text-regular"
                    >
                      {docData?.name || ''}
                    </span>
                    <span className="text-regular"> > </span> Preview
                  </h5>
                </div>
                <div className="col-sm-4">
                  <div className="table-filter-div">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        // navigate(
                        //   `/admin/EditDocument?documentId=${documentId}`
                        // );
                        onchangeType(lastChangeType || 'edit', documentId);
                      }}
                    >
                      Exit preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pre-document-card">
            {/*<div className="pre-doc-title">*/}
            {/*  <h5 className="textcolor2">*/}
            {/*    {docData?.name?.toUpperCase()} DOCUMENT*/}
            {/*  </h5>*/}
            {/*</div>*/}
            {/*<div className="doc-box">*/}
            {/*  <div className="doc-box-head">*/}
            {/*    <div className="row align-items-center">*/}
            {/*      <img*/}
            {/*        src={docData?.headerImage}*/}
            {/*        alt="header-img"*/}
            {/*        className="img-fluid doc-header-img"*/}
            {/*        width="100%"*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="doc-box-body">*/}
            {/*    <div*/}
            {/*      dangerouslySetInnerHTML={{ __html: docData?.content || '' }}*/}
            {/*    />*/}
            {/*    <div className="doc-box-sign">*/}
            {/*      <img*/}
            {/*        src={docData?.signature}*/}
            {/*        alt="signature-img"*/}
            {/*        className="img-fluid doc-signature-img"*/}
            {/*        width="100%"*/}
            {/*      />*/}
            {/*      /!*<p>*!/*/}
            {/*      /!*  Huzaifa Bhaisab*!/*/}
            {/*      /!*  <br />*!/*/}
            {/*      /!*  24th August 2022*!/*/}
            {/*      /!*</p>*!/*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="doc-box-footer">*/}
            {/*    <p className="text-center">*/}
            {/*      <img*/}
            {/*        src={docData?.footerImage}*/}
            {/*        alt="footer-img"*/}
            {/*        className="img-fluid doc-footer-img"*/}
            {/*        width="100%"*/}
            {/*      />*/}
            {/*    </p>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/*<div dangerouslySetInnerHTML={{ __html: base64Data }} />*/}
            <iframe
              src={base64Data}
              style={{ width: '100%', height: '1000px', border: 'none' }}
              title="Base64 Content"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPreviewDocument;
