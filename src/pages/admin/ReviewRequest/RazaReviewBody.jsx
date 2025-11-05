import React, { useCallback, useEffect, useState } from 'react';
import RazaReviewHeader from './RazaReviewHeader';
import {
  getDocumentByCategories,
  getDocumentPreview,
} from '../../../services/documentService';
import GreenEyeIcon from '../../../components/svgIcons/GreenEyeIcon';
import DeleteIcon from '../../../components/svgIcons/DeleteIcon';
import { previewRazaDocument } from '../../../services/arazService';
import RoundedCloseIcon from '../../../components/svgIcons/RoundedCloseIcon';
import RequestSuccessModel from './RequestSuccessModel';
import EditIconDocs from '../../../components/svgIcons/EditIconDocs';
import { useNavigate } from 'react-router-dom';

const RazaReviewBody = ({ requestData, deleteDocumentHandler }) => {
  const [base64Data, setBase64Data] = useState('');
  const [details, setDetails] = useState(null);
  const [manzooriDoc, setManzooriDoc] = useState(null);
  const [istershaadDoc, setIstershaadDoc] = useState(null);
  const [base64ManzooriData, setBase64ManzooriData] = useState('');
  const [base64IstershaadData, setBase64IstershaadData] = useState('');
  const [show, setShow] = useState('form');
  const [docId, setDocId] = useState('');
  const navigate = useNavigate();

  const replacePlaceholders = (htmlString, questions) => {
    let modifiedHtml = htmlString;
    if (htmlString && questions && questions.length > 0) {
      questions.forEach((answerObj) => {
        const placeholder = `{{${answerObj.question_id}}}`;
        modifiedHtml = modifiedHtml.split(placeholder).join(answerObj.answer);
      });
      return modifiedHtml;
    }
    return htmlString;
  };

  const loadPreview = useCallback(async () => {
    try {
      if (
        !requestData ||
        !requestData?.category_id ||
        !requestData?.sub_category_id ||
        !requestData?.child_category_id
      ) {
        return;
      }

      const result = await getDocumentByCategories(
        requestData.category_id,
        requestData.sub_category_id,
        requestData.child_category_id,
        'form'
      );

      if (!result.data.id) {
        return;
      }
      setDocId(result.data.id || '');
      const finalPreview = await getDocumentPreview(
        result.data.id,
        true,
        false
      );
      const updatedHtml = replacePlaceholders(
        finalPreview?.data || '',
        requestData?.razaRequestDetails || []
      );
      setBase64Data(updatedHtml);

      //instedarr and manzoori
      onGenerateDocuments(requestData);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [requestData]);

  useEffect(() => {
    loadPreview();
  }, [loadPreview]);

  useEffect(() => {
    const nameChild = requestData?.formId?.childCategoryId?.name || '';
    const nameSub = requestData?.formId?.subCategoryId?.name || '';

    const categoryData = requestData?.categoryId;
    const arazName = `${nameSub || ''} dealing in ${nameChild || ''} in ${categoryData?.jamaat?.name || ''} city`;
    const location = `${categoryData?.jamaat?.name || ''}, ${categoryData?.jamiat?.name || ''}`;
    const params = {
      arazName,
      location,
      questionAnswers: requestData?.razaRequestDetails || [],
    };
    setDetails(params);
  }, [requestData]);

  const onGenerateDocuments = (data) => {
    if (!data) {
      return;
    }

    // Find the document of type 'manzoori'
    const manzooriDoc = data?.razaRequestDocuments.find(
      (doc) => doc.type === 'manzoori'
    );
    // Find the document of type 'istershaad'
    const istershaadDoc = data?.razaRequestDocuments.find(
      (doc) => doc.type === 'istershaad'
    );

    // Set the state for each document
    setManzooriDoc(manzooriDoc || null); // Set null if not found
    setIstershaadDoc(istershaadDoc || null); // Set null if not found
  };

  const viewIstershaad = async (id) => {
    const finalPreview = await previewRazaDocument(id, true, false);
    const istershaadHtml = replacePlaceholders(
      finalPreview?.data || '',
      requestData?.razaRequestDetails || []
    );
    setBase64IstershaadData(istershaadHtml || '');
    setShow('istershaad');
  };

  const viewManzoori = async (id) => {
    const finalPreview = await previewRazaDocument(id, true, false);
    const manzooriHtml = replacePlaceholders(
      finalPreview?.data || '',
      requestData?.razaRequestDetails || []
    );
    setBase64ManzooriData(manzooriHtml || '');
    setShow('manzoori');
  };

  return (
    <>
      <div className="raza-progress-card">
        <RazaReviewHeader
          onGenerateDocuments={onGenerateDocuments}
          requestData={requestData}
          istershaadDoc={istershaadDoc}
          manzooriDoc={manzooriDoc}
          docId={docId}
        />
        <RequestSuccessModel
          requestData={requestData}
          manzooriDocId={manzooriDoc?.id}
          istershaadDocId={istershaadDoc?.id}
          base64Data={base64Data}
        />
        <div className="raza-progress-body">
          <div className="row">
            <div className="col-md-5">
              <div className="araz-info-card  araz-info-card-light shadow-none mb-4">
                <div className="accordion araz-accordion" id="Araz_Accordion">
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-transparent p-0 shadow-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#logcollapse1"
                        aria-expanded="true"
                        aria-controls="logcollapse1"
                      >
                        <div className="araz-info-group">
                          <div className="araz-info-icon">
                            <img
                              src="/assets/images/name-icon.svg"
                              alt="img"
                              className="img-fluid"
                            />
                          </div>
                          <div className="araz-info-text">
                            <p>Your araz is for</p>
                            <h5>{details?.arazName || '-'}</h5>
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id="logcollapse1"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#Log_Accordion"
                    >
                      <div className="accordion-body p-0">
                        <div className="araz-info-group">
                          <div className="araz-info-icon">
                            <img
                              src="/assets/images/location-icon.svg"
                              alt="img"
                              className="img-fluid"
                            />
                          </div>
                          <div className="araz-info-text">
                            <p>Location of business</p>
                            <h5>{details?.location || '-'}</h5>
                          </div>
                        </div>

                        {/*<div className="araz-info-group">*/}
                        {/*    <div className="araz-info-icon">*/}
                        {/*        <img*/}
                        {/*            src="/assets/images/bag-icon.svg"*/}
                        {/*            alt="img"*/}
                        {/*            className="img-fluid"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div className="araz-info-text">*/}
                        {/*        <p>Type of business</p>*/}
                        {/*        <h5>Hardware, Tools and Machinery</h5>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="araz-info-group">*/}
                        {/*    <div className="araz-info-icon">*/}
                        {/*        <img*/}
                        {/*            src="/assets/images/star-icon.svg"*/}
                        {/*            alt="img"*/}
                        {/*            className="img-fluid"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div className="araz-info-text">*/}
                        {/*        <p>First name of your choice</p>*/}
                        {/*        <h5>Saifee Hardware Store</h5>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {details?.questionAnswers.length > 0 &&
                          details?.questionAnswers.map((item) => (
                            <div
                              className="araz-info-group"
                              key={item.questionId}
                            >
                              <div className="araz-info-icon">
                                <img
                                  src="/assets/images/drafts.png"
                                  alt="img"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="araz-info-text">
                                <p>{item.question}</p>
                                <h5>{item.answer}</h5>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {istershaadDoc && (
                <div className="araz-info-card  araz-info-card-light shadow-none mb-4">
                  <p className="text-center mb-3">Istershaad Letter</p>
                  <div className="letter-card d-flex flex-wrap justify-content-between align-items-center">
                    <p className="textcolor2">{istershaadDoc.name}.pdf</p>
                    <div className="rph-group circle-icon-btn gap-3 d-flex justify-content-end align-items-center flex-wrap">
                      <button
                        className="btn p-0"
                        onClick={() => viewIstershaad(istershaadDoc.id)}
                      >
                        <GreenEyeIcon />
                      </button>
                      <button
                        className="btn p-0"
                        onClick={() =>
                          navigate(
                            `/admin/request-review/${requestData.id}/document/${istershaadDoc.id}`
                          )
                        }
                      >
                        <EditIconDocs />
                      </button>

                      <button
                        onClick={() => deleteDocumentHandler(istershaadDoc.id)}
                        className="btn p-0"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {manzooriDoc && (
                <div className="araz-info-card  araz-info-card-light shadow-none mb-4">
                  <p className="text-center mb-3">Manzoori Letter</p>
                  <div className="letter-card d-flex flex-wrap justify-content-between align-items-center">
                    <p className="textcolor2">{manzooriDoc.name}.pdf</p>
                    <div className="rph-group circle-icon-btn gap-3 d-flex justify-content-end align-items-center flex-wrap">
                      <button
                        className="btn p-0"
                        onClick={() => viewManzoori(manzooriDoc.id)}
                      >
                        <GreenEyeIcon />
                      </button>
                      <button
                        className="btn p-0"
                        onClick={() =>
                          navigate(
                            `/admin/request-review/${requestData.id}/document/${manzooriDoc.id}`
                          )
                        }
                      >
                        <EditIconDocs />
                      </button>
                      <button
                        onClick={() => deleteDocumentHandler(manzooriDoc.id)}
                        className="btn p-0"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-7">
              <div className="araz-card p-0 bg-transparent">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="preview-label">
                    {show === 'manzoori' && base64ManzooriData
                      ? 'Manzoori Preview'
                      : show === 'istershaad' && base64IstershaadData
                        ? 'Istershaad Preview'
                        : show === 'form' && base64Data
                          ? 'Form Preview'
                          : 'No Preview Available'}
                  </div>
                  {show !== 'form' && (
                    <button
                      className="btn"
                      aria-label="Close"
                      onClick={() => setShow('form')}
                    >
                      <RoundedCloseIcon />
                    </button>
                  )}
                </div>

                {show === 'manzoori' && base64ManzooriData ? (
                  <div className="araz-card overflow-auto">
                    <div
                      dangerouslySetInnerHTML={{ __html: base64ManzooriData }}
                    />
                  </div>
                ) : show === 'istershaad' && base64IstershaadData ? (
                  <div className="araz-card overflow-auto">
                    <div
                      dangerouslySetInnerHTML={{ __html: base64IstershaadData }}
                    />
                  </div>
                ) : show === 'form' && base64Data ? (
                  <div className="araz-card overflow-auto">
                    <div dangerouslySetInnerHTML={{ __html: base64Data }} />
                  </div>
                ) : (
                  <div>
                    <p>No preview available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RazaReviewBody;
