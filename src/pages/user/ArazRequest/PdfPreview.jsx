import React, { useState, useEffect } from 'react';

const DisplayPdf = ({ base64Data }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (base64Data) {
      const pdfBlob = new Blob(
        [Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))],
        {
          type: 'application/pdf',
        }
      );
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      // Cleanup the object URL when the component is unmounted
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [base64Data]);

  return (
    <div>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF Document"
        ></iframe>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default DisplayPdf;
