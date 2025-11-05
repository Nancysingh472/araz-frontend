import React, { useState, useEffect } from 'react';
import UserArazForm from './UserArazForm';
import UserArazPreview from './UserArazPreview';

const ArazRequestMaster = ({ base64Data }) => {
  const [viewType, setViewType] = useState('form');
  const [finalData, setFinalData] = useState(null);
  const [documentId, setDocumentId] = useState(null);

  const onChangeView = (type, data = null) => {
    setViewType(type);
    setFinalData(data);
  };

  return (
    <div>
      {viewType === 'form' && (
        <UserArazForm
          finalData={finalData}
          onChangeView={onChangeView}
          setDocumentId={setDocumentId}
        />
      )}
      {viewType === 'preview' && (
        <UserArazPreview
          documentId={documentId}
          finalData={finalData}
          onChangeView={onChangeView}
        />
      )}
    </div>
  );
};

export default ArazRequestMaster;
