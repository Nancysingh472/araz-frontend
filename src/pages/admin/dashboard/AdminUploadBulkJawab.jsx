import React, { useState, useEffect } from 'react';
import {
  getDocumentByCategories,
  getDocumentPreview,
} from '../../../services/documentService';
import RazaJawabForm from './RazaJawabrForm';
import { addRazaJawab } from '../../../services/razaJawabService';
import { toast } from 'react-toastify';
import WhiteEyeIcon from '../../../components/svgIcons/WhiteEyeIcon';

const AdminUploadBulkJawab = ({
  reqJawabList,
  jawabServiceData,
  jawabAnswerData,
  setStep,
}) => {
  const [finalList, setFinalList] = useState([]);
  const [idList, setIdList] = useState([]);

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

      // Extract `id` values as strings and set the `isList` state
      const idsAsStrings = validData.map((item) => item.id.toString());
      setIdList(idsAsStrings);
    };

    if (reqJawabList.length > 0) {
      void fetchHtmlData();
    }
  }, [reqJawabList]);

  const uploadJawab = async (data) => {
    // Convert string arrays to integer arrays
    const preparedData = {
      ...data,
      jawab_answers: data.jawab_answers.map(Number),
      jawab_recommanded_service: data.jawab_recommanded_service.map(Number),
      raza_ids: data.raza_ids.map(Number),
    };

    try {
      await addRazaJawab(preparedData);
      toast.success('Jawab sent successfully.');
      setStep('dashboard');
    } catch (error) {
      console.error('Error submitting business type:', error);
    }
  };

  return (
    <div className="upload-bulk-content px-20">
      <RazaJawabForm
        handleSubmit={uploadJawab}
        idList={idList}
        jawabServiceData={jawabServiceData}
        jawabAnswerData={jawabAnswerData}
      />
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
            Upload bulk jawab
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
                  <div className="rph-group circle-icon-btn gap-3 d-flex justify-content-end align-items-center flex-wrap">
                    <button
                      className="btn btn-primary shadow-none w-auto"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#add_raza_jawab"
                      aria-controls="offcanvasRight"
                    >
                      Send jawabs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="raza-progress-body">
            <div className="jawab-listing-div-preview">
              <div className="row">
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
    </div>
  );
};

export default AdminUploadBulkJawab;
