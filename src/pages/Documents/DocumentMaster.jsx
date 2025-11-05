import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import AdminDocument from './AdminDocument';
import AdminEditDocument from './AdminEditDocument';
import AdminPreviewDocument from './AdminPreviewDocument';
import AdminBulkEditDocument from './AdminBulkEditDocument';

const DocumentMaster = () => {
  const [viewType, setViewType] = useState('list');
  const [documentId, setDocumentId] = useState('');
  const [lastChangeType, setLastChangeType] = useState('');

  const onchangeType = (type, docId = '') => {
    setDocumentId(docId);
    setLastChangeType(viewType);
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
      {viewType === 'edit-bulk' && (
        <AdminBulkEditDocument
          onchangeType={onchangeType}
          documentId={documentId}
        />
      )}
      {viewType === 'preview' && (
        <AdminPreviewDocument
          lastChangeType={lastChangeType}
          onchangeType={onchangeType}
          documentId={documentId}
        />
      )}
    </div>
  );
};

export default DocumentMaster;
