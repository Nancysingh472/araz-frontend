import React, { useState, useCallback, useEffect } from 'react';

import { Link } from 'react-router-dom';
import RazaReviewBody from './RazaReviewBody';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteGenerateDocuments,
  getRequestById,
} from '../../../services/arazService';
import RazaComments from './RazaComment';

const ReviewRequestMaster = () => {
  const { requestId } = useParams();

  const [requestData, setRequestData] = useState(null);

  const fetchRequestData = useCallback(async () => {
    try {
      const result = await getRequestById(requestId);
      setRequestData(result.data || null);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [requestId]);

  useEffect(() => {
    void fetchRequestData();
  }, [fetchRequestData]);

  const deleteDocumentHandler = async (id) => {
    if (!id) {
      return;
    }
    await deleteGenerateDocuments(id);
    void fetchRequestData();
  };

  return (
    <div className="overview-content px-20">
      <div className="container-fluid">
        <div className="title-div mb-4">
          <h5>
            <Link to="/admin/dashboard">
              <a className="text-decoration-underline text-white text-regular">
                Dashboard
              </a>
            </Link>
            <span className="text-regular"> > </span>
            <a
              href="#"
              className="text-decoration-underline text-white text-regular me-2"
            >
              Araz ID-{requestData?.id || ''}
            </a>
            Overview
          </h5>
        </div>
        <RazaReviewBody
          requestData={requestData}
          deleteDocumentHandler={deleteDocumentHandler}
        />
      </div>
      <RazaComments requestId={requestId} />
    </div>
  );
};

export default ReviewRequestMaster;
