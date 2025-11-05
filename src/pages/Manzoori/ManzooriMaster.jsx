import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import AdminDocument from './AdminDocument';
import AdminEditDocument from './AdminEditDocument';
import AdminPreviewDocument from './AdminPreviewDocument';

const ManzooriMaster = () => {
  const [viewType, setViewType] = useState('list');
  const [documentId, setDocumentId] = useState('');

  console.log('=viewType', viewType);

  const onchangeType = (type, docId = '') => {
    setDocumentId(docId);
    setViewType(type);
  };
  return (
    <div>
      {viewType === 'list' && <AdminDocument onchangeType={onchangeType} />}
      {viewType === 'edit' && (
        <AdminEditDocument
          onchangeType={onchangeType}
          documentId={documentId}
        />
      )}
      {viewType === 'preview' && (
        <AdminPreviewDocument
          onchangeType={onchangeType}
          documentId={documentId}
        />
      )}
    </div>
  );
};

export default ManzooriMaster;
