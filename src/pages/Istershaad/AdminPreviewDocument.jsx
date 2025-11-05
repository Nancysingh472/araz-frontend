import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getDocumentById,
  getDocumentPreview,
} from '../../services/documentService';

const AdminPreviewDocument = ({ onchangeType, documentId }) => {
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
      const result = await getDocumentPreview(documentId, true);
      setBase64Data(result?.data || '');
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, []);

  useEffect(() => {
    fetchPreviewData();
  }, [fetchPreviewData]);

  return (
    <div className="preview-document-content px-20">
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
                      onClick={() => onchangeType('edit', documentId)}
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
                        onchangeType('edit', documentId);
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

            <div dangerouslySetInnerHTML={{ __html: base64Data }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPreviewDocument;
