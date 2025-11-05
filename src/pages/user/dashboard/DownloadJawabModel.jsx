import React, { useEffect, useState, useCallback } from 'react';
import UserRequestTable from './UserRequestTable';
import UserDashboardSlider from './UserDashboardSlider';
import { getRequestById } from '../../../services/arazService';
import {
  getDocumentByCategories,
  getDocumentPreview,
} from '../../../services/documentService';
import OwlCarousel from 'react-owl-carousel';

const DownloadJawabModel = ({ requestId }) => {
  const [requestData, setRequestData] = useState(null);
  const [base64Data, setBase64Data] = useState('');
  const [details, setDetails] = useState(null);

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

  const fetchRequestData = useCallback(async () => {
    try {
      if (!requestId) {
        return;
      }
      const response = await getRequestById(requestId);
      const requestData = response.data || null;
      setRequestData(requestData);

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
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [requestId]);

  useEffect(() => {
    void fetchRequestData();
  }, [fetchRequestData]);

  useEffect(() => {
    const nameChild = requestData?.formId?.childCategoryId?.name || '';
    const nameSub = requestData?.formId?.subCategoryId?.name || '';

    const categoryData = requestData?.categoryId;
    const arazName = `${nameSub || ''} dealing in ${nameChild || ''} in ${categoryData?.jamaat?.name || ''} city`;
    const location = `${categoryData?.jamaat?.name || ''}, ${categoryData?.jamiat?.name || ''}`;

    // Populate razaService and razaAnswers
    const razaService =
      requestData?.jawabs
        ?.filter((item) => item?.razaJawab?.type === 'service')
        ?.map((item) => ({
          id: item.id,
          name: item.razaJawab?.name,
          cta: {
            title: item.razaJawab?.cta_title,
            action: item.razaJawab?.cta_action,
            text: item.razaJawab?.cta_text,
          },
        })) || [];

    const razaAnswers =
      requestData?.jawabs
        ?.filter((item) => item?.razaJawab?.type === 'answer')
        ?.map((item) => ({
          id: item.id,
          name: item.razaJawab?.name,
          cta: {
            title: item.razaJawab?.cta_title,
            action: item.razaJawab?.cta_action,
            text: item.razaJawab?.cta_text,
          },
        })) || [];

    const params = {
      arazName,
      location,
      razaService,
      razaAnswers,
    };

    setDetails(params);
  }, [requestData]);

  console.log('==requestData', requestData);
  return (
    <div
      className="modal fade download-jawab-modal"
      id="Download_Jawab_Modal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body p-0">
            <div className="araz-modal-top">
              <h4 className="modal-title pb-3">
                Congratulations! Your Jawab has been received.
              </h4>
              <div className="row">
                <div className="col-md-6 order-2 order-sm-2 order-md-1">
                  <div className="araz-card overflow-auto">
                    <div dangerouslySetInnerHTML={{ __html: base64Data }} />
                  </div>
                </div>
                <div className="col-md-6 order-1 order-sm-1 order-md-2">
                  <div className="araz-info-card">
                    <div className="araz-info-group">
                      <div className="araz-info-text">
                        <p>Your araz is for</p>
                        <h5>{details?.arazName || '-'}</h5>
                      </div>
                    </div>

                    <div className="araz-info-group">
                      <div className="araz-info-text">
                        <p>Location of business</p>
                        <h5>{details?.location || '-'}</h5>
                      </div>
                    </div>

                    {details?.razaAnswers.length > 0 &&
                      details?.razaAnswers.map((item, index) => (
                        <div className="araz-info-group" key={index}>
                          <div className="araz-info-text">
                            <p>{item.cta.title}</p>
                            <h5>{item.name}</h5>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="araz-modal-bottom">
              <div className="dash-slider-div mb-4">
                <OwlCarousel
                  key={Math.random()}
                  className="owl-theme"
                  loop={false}
                  margin={20}
                  nav={false}
                  items={2}
                >
                  {' '}
                  {details?.razaService.length > 0 &&
                    details?.razaService.map((service, index) => (
                      <div className="services-card" key={service.id}>
                        <div className="sc-img">
                          <img
                            src={`/assets/images/sc-img${(index % 2) + 1}.png`} // Example for alternating images
                            alt={service.name}
                            className="img-fluid"
                          />
                        </div>
                        <div className="sc-content">
                          <p>{service.name}</p>
                          <button className="btn btn-primary">
                            {service.cta.title}
                          </button>
                        </div>
                      </div>
                    ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadJawabModel;
