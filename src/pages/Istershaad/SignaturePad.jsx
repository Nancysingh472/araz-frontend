import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { getSignedUrl } from '../../services/fileService';

const SignaturePad = ({ handleDrawnSignature, docData }) => {
  const sigCanvas = useRef({});
  const [signatureDataURL, setSignatureDataURL] = useState('');
  const [isSignatureSaved, setIsSignatureSaved] = useState(false);

  // Clear the signature canvas
  const clearSignature = () => {
    if (!isSignatureSaved) sigCanvas.current.clear();
    setSignatureDataURL('');
    setIsSignatureSaved(false); // Show canvas again when signature is cleared
  };

  // Convert base64/URL data to a Blob
  const dataURLToBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]); // Decode base64 string
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]; // Extract MIME type
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // Save the signature as a data URL and hide the canvas
  const saveSignature = async () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSignatureDataURL(dataURL); // Store signature data URL
    setIsSignatureSaved(true); // Hide canvas when signature is saved

    const signatureBlob = dataURLToBlob(dataURL);
    const response = await getSignedUrl('signature.png', signatureBlob.type);
    const signUrl = response?.data?.url || '';
    const fileKey = new URL(signUrl).pathname.split('/').pop();
    handleDrawnSignature(fileKey);
  };

  return (
    <div className="sign-canvas">
      {!isSignatureSaved ? (
        <div>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ width: 400, height: 200, className: 'sigCanvas' }}
          />
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary mx-2" onClick={clearSignature}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={() => saveSignature()}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <img src={signatureDataURL} alt="Saved Signature" />
          <div className="d-flex justify-content-around mt-3">
            <button className="btn btn-primary" onClick={clearSignature}>
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
