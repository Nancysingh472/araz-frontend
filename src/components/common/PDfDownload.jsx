import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentPreview } from '../../services/documentService';

const PDfDownload = () => {
  const { documentId } = useParams();

  const [pdfURL, setPdfURL] = useState('');

  const fetchPreviewData = useCallback(async () => {
    try {
      if (!documentId) {
        return;
      }
      const result = await getDocumentPreview(documentId, false);

      const pdfBlob = new Blob(
        [Uint8Array.from(atob(result?.data), (c) => c.charCodeAt(0))],
        { type: 'application/pdf' }
      );
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfURL(pdfUrl);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [documentId]);

  useEffect(() => {
    fetchPreviewData();
  }, [fetchPreviewData]);

  return (
    <>
      <div>
        <div>
          <h1>PDF Viewer</h1>
          <a href={pdfURL} target="_blank" rel="noopener noreferrer">
            Open PDF in New Tab
          </a>
        </div>
      </div>
    </>
  );
};

export default PDfDownload;
