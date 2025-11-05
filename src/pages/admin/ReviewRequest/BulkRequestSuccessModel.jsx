import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { previewRazaDocument } from '../../../services/arazService';

const RequestSuccessModel = ({
  istershaadDocId,
  manzooriDocId,
  base64Data,
  requestData,
}) => {
  const [base64ManzooriData, setBase64ManzooriData] = useState('');
  const [base64IstershaadData, setBase64IstershaadData] = useState('');
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

  const viewIstershaad = async (id) => {
    const finalPreview = await previewRazaDocument(id, true, false);
    const istershaadHtml = replacePlaceholders(
      finalPreview?.data || '',
      requestData?.razaRequestDetails || []
    );
    setBase64IstershaadData(istershaadHtml || '');
  };

  const viewManzoori = async (id) => {
    const finalPreview = await previewRazaDocument(id, true, false);
    const manzooriHtml = replacePlaceholders(
      finalPreview?.data || '',
      requestData?.razaRequestDetails || []
    );
    setBase64ManzooriData(manzooriHtml || '');
  };

  useEffect(() => {
    if (!requestData) {
      return;
    }
    if (manzooriDocId) {
      void viewManzoori(manzooriDocId);
    }
    if (istershaadDocId) {
      void viewIstershaad(istershaadDocId);
    }
  }, [istershaadDocId, manzooriDocId]);

  return (
    <div
      className="modal fade araz-modal"
      id="Sent_Successfully"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="help-box step-3">
            <div className="ntf-head">
              <div></div>
              <div className="d-flex gap-4">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    navigate('/admin/dashboard');
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5127 0.503977C21.3583 0.349284 21.175 0.226556 20.9731 0.142819C20.7712 0.0590823 20.5548 0.0159799 20.3363 0.0159799C20.1177 0.0159799 19.9013 0.0590823 19.6995 0.142819C19.4976 0.226556 19.3142 0.349284 19.1599 0.503977L11 8.64716L2.84014 0.48729C2.68565 0.3328 2.50224 0.210252 2.30039 0.126642C2.09854 0.0430327 1.88219 1.62782e-09 1.66371 0C1.44523 -1.62782e-09 1.22889 0.0430327 1.02704 0.126642C0.825186 0.210251 0.64178 0.3328 0.48729 0.48729C0.3328 0.64178 0.210251 0.825186 0.126642 1.02704C0.0430327 1.22889 -1.62782e-09 1.44523 0 1.66371C1.62782e-09 1.88219 0.0430327 2.09854 0.126642 2.30039C0.210252 2.50224 0.3328 2.68565 0.48729 2.84014L8.64716 11L0.48729 19.1599C0.3328 19.3144 0.210251 19.4978 0.126642 19.6996C0.0430327 19.9015 0 20.1178 0 20.3363C0 20.5548 0.0430327 20.7711 0.126642 20.973C0.210251 21.1748 0.3328 21.3582 0.48729 21.5127C0.64178 21.6672 0.825186 21.7897 1.02704 21.8734C1.22889 21.957 1.44523 22 1.66371 22C1.88219 22 2.09854 21.957 2.30039 21.8734C2.50224 21.7897 2.68565 21.6672 2.84014 21.5127L11 13.3528L19.1599 21.5127C19.3144 21.6672 19.4978 21.7897 19.6996 21.8734C19.9015 21.957 20.1178 22 20.3363 22C20.5548 22 20.7711 21.957 20.973 21.8734C21.1748 21.7897 21.3582 21.6672 21.5127 21.5127C21.6672 21.3582 21.7897 21.1748 21.8734 20.973C21.957 20.7711 22 20.5548 22 20.3363C22 20.1178 21.957 19.9015 21.8734 19.6996C21.7897 19.4978 21.6672 19.3144 21.5127 19.1599L13.3528 11L21.5127 2.84014C22.1468 2.20604 22.1468 1.13808 21.5127 0.503977Z"
                      fill="#A3A3A3"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="ntf-body">
              <div className="fdd-box mb-3 mb-sm-3 mb-md-5 text-center">
                <img
                  src="/assets/images/done-icon.svg"
                  alt="icon"
                  className="img-fluid mb-2"
                />
                <h5 className="text-primary">Request Accepted</h5>
              </div>
              <div className="raza-progress-body raza-list-box bg-white">
                <div className="row justify-content-center mb-0 mb-sn-0 mb-md-5 pb-0 pb-sn-0 pb-md-5">
                  <div className="col-md-4">
                    <div className="araz-card p-0 bg-transparent shadow mb-4">
                      {/*<img*/}
                      {/*  src="/assets/images/araz.png"*/}
                      {/*  alt="img"*/}
                      {/*  className="img-fluid"*/}
                      {/*  width="100%"*/}
                      {/*/>*/}
                      {base64Data ? (
                        <div className="araz-card overflow-auto">
                          <div
                            dangerouslySetInnerHTML={{ __html: base64Data }}
                          />
                        </div>
                      ) : (
                        <div>
                          <p>No preview available.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="araz-card blue-box p-0 bg-transparent shadow mb-4 position-relative">
                      {/*<img*/}
                      {/*  src="/assets/images/araz.png"*/}
                      {/*  alt="img"*/}
                      {/*  className="img-fluid"*/}
                      {/*  width="100%"*/}
                      {/*/>*/}
                      {base64IstershaadData ? (
                        <div className="araz-card overflow-auto">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: base64IstershaadData,
                            }}
                          />
                        </div>
                      ) : (
                        <div>
                          <p>No preview available.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="araz-card blue-box p-0 bg-transparent shadow mb-4">
                      {/*<img*/}
                      {/*  src="/assets/images/araz.png"*/}
                      {/*  alt="img"*/}
                      {/*  className="img-fluid"*/}
                      {/*  width="100%"*/}
                      {/*/>*/}
                      {base64ManzooriData ? (
                        <div className="araz-card overflow-auto">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: base64ManzooriData,
                            }}
                          />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSuccessModel;
