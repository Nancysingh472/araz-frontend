import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { acceptBulkRequestAPI, bulkPreviewDocApi } from '../../../services/arazService';
import RoundedCloseIcon from '../../../components/svgIcons/RoundedCloseIcon';
import BulkRequestSuccessModel from '../ReviewRequest/BulkRequestSuccessModel';
import WhiteEyeIcon from '../../../components/svgIcons/WhiteEyeIcon';
import { getDocumentByCategories, getDocumentPreview } from '../../../services/documentService';

const AdminBulkApproveJawab = ({ reqJawabList, setStep }) => {
  const [finalList, setFinalList] = useState([]);
  const [doc, setDoc] = useState();

  useEffect(() => {
    const fetchHtmlData = async () => {
      // Map over reqJawabList and fetch data for each requestData
      const dataWithHtml = await Promise.all(
        reqJawabList.map(async (requestData) => {
          try {
            // Fetch document by categories
            const result = await getDocumentByCategories(
              requestData.category_id,
              requestData.sub_category_id,
              requestData.child_category_id,
              'form'
            );

            if (!result?.data?.id) return null; // Skip if no result ID

            // Fetch document preview
            const finalPreview = await getDocumentPreview(
              result.data.id,
              true,
              true
            );

            // Replace placeholders in HTML with the required data
            // const updatedHtml = replacePlaceholders(
            //     finalPreview?.data || '',
            //     requestData?.razaRequestDetails || []
            // );
            const updatedHtml = finalPreview?.data || '';

            // Return the formatted object with id, name, and generated HTML
            return {
              id: requestData.id,
              // name: requestData.name,
              htmlData: updatedHtml,
            };
          } catch (error) {
            console.error(
              `Error fetching data for request ID ${requestData.id}:`,
              error
            );
            return null;
          }
        })
      );

      // Filter out any null values and update the final list state
      const validData = dataWithHtml.filter(Boolean);
      setFinalList(validData);
    };

    if (reqJawabList.length > 0) {
      void fetchHtmlData();
    }
  }, [reqJawabList]);

  const approveSubmit = async () => {
    try {
      await acceptBulkRequestAPI({
        status: 'completed',
        ids: reqJawabList.map(item => item.id),
      });
      toast.success('Approved Raza request successfully.');
      setStep('dashboard');
    } catch (error) {
      console.error('Error submitting business type:', error);
    }
  };

  const buildBulkPreview = async () => {
    try {
      let response = await bulkPreviewDocApi(reqJawabList.map(item => item.id));
      setDoc(response.data);
    } catch (error) {
      console.error('Error submitting business type:', error);
    }
  };

  return (
    <div className="upload-bulk-content px-20">
      <BulkRequestSuccessModel />
      <div className="container-fluid">
        <div className="title-div mb-4">
          <h5>
            <span
              className="text-decoration-underline text-white text-regular"
              onClick={() => setStep('dashboard')}
            >
              Dashboard
            </span>
            <span className="text-regular"> > </span>
            Submit bulk Request
          </h5>
        </div>
        <div className="raza-progress-card">
          <div className="raza-progress-head mb-4">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <div className="rph-left mb-3 mb-sm-0">
                  <div className="rph-group">
                    <p className="font-22">All selected requests</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="rph-right">
                  <div
                    className="rph-group circle-icon-btn gap-3 d-flex justify-content-end align-items-center flex-wrap">
                    <button
                      onClick={() => buildBulkPreview()}
                      className="btn btn-primary shadow-none w-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#bulk_approve_modal"
                    >
                      Submit Bulk Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="jawab-listing-div-preview">
              <div className="row gap-4">
                {finalList.map((item) => (
                  <div className="col">
                    <div className="jawab-card position-relative">
                      <p className="mb-2">
                        <span className="d-block">TR-{item.id}</span>
                      </p>
                      <div className="araz-card overflow-auto">
                        <div
                          dangerouslySetInnerHTML={{ __html: item.htmlData }}
                        />
                      </div>
                      <button className="btn btn-primary">
                        <WhiteEyeIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade header-modal"
        id="bulk_approve_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="p-3">
              <div className="ntf-head">
                <div></div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <RoundedCloseIcon />
                </button>
              </div>
              <div className="ntf-body">
                <div className="my-2">
                  <div className="araz-card overflow-auto">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: doc || '',
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary shadow-none w-auto"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => approveSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBulkApproveJawab;
