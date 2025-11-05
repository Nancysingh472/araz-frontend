import React, { useCallback, useState, useEffect } from 'react';

import EyeIcon from '../../components/svgIcons/EyeIcon';
import UploadIcon from '../../components/svgIcons/UploadIcon';
import SmallCloseButton from '../../components/svgIcons/SmallCloseButton';
import { editDocument, getDocumentById } from '../../services/documentService';
import TextEditor from './TextEditor';
import { getSignedUrl, uploadFile } from '../../services/fileService';
import { getFormByCategories } from '../../services/formService';
import LoaderDots from '../../components/common/LoaderDots';

const AdminEditDocument = ({ onchangeType, documentId }) => {
  const [docData, setDocData] = useState(null);
  const [isValidForm, setIsValidForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const [s3Files, setS3Files] = useState({
    headerImage: { file: null, signUrl: null, tempUrl: null, fileKey: null },
    footerImage: { file: null, signUrl: null, tempUrl: null, fileKey: null },
    watermarkImage: { file: null, signUrl: null, tempUrl: null, fileKey: null },
    signatureImage: { file: null, signUrl: null, tempUrl: null, fileKey: null },
  });

  const loadDocData = useCallback(async () => {
    try {
      const result = await getDocumentById(documentId);
      setDocData(result.data || null);
      if (result.data) {
        setS3Files({
          headerImage: {
            tempUrl: result.data.headerImage || null,
            file: null,
            signUrl: null,
            fileKey: result?.data?.headerImageFileKey,
          },
          footerImage: {
            tempUrl: result.data.footerImage || null,
            file: null,
            signUrl: null,
            fileKey: result.data.footerImageFileKey,
          },
          watermarkImage: {
            tempUrl: result.data.watermarkImage || null,
            file: null,
            signUrl: null,
            fileKey: result.data.watermarkImageFileKey,
          },
          signatureImage: {
            tempUrl: result.data.signature || null,
            file: null,
            signUrl: null,
            fileKey: result.data.signatureFileKey,
          },
        });
      }
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [documentId]);

  useEffect(() => {
    void loadDocData();
  }, [loadDocData]);

  const loadFormData = useCallback(async () => {
    try {
      const result = await getFormByCategories(
        docData.categoryId.id,
        docData.subCategoryId.id,
        docData.childCategoryId.id
      );
      setFormData(result.data || null);
      setQuestionList(result.data?.questions || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [docData]);

  useEffect(() => {
    void loadFormData();
  }, [loadFormData]);

  useEffect(() => {
    if (docData && questionList.length > 0) {
      let contentWithQuestions = docData?.content || '';

      // Replace the ids (e.g., {{1}}) with their corresponding question placeholders (e.g., {{firstname}})
      questionList.forEach((item) => {
        const idPlaceholder = `{{${item.id}}}`;
        const escapedIdPlaceholder = idPlaceholder.replace(/[{}]/g, '\\$&');
        const questionReplacement = `{{${item.question}}}`;

        contentWithQuestions = contentWithQuestions.replace(
          new RegExp(escapedIdPlaceholder, 'g'),
          questionReplacement
        );
      });

      setContent(contentWithQuestions);
    }
  }, [docData, questionList]);

  // Handle file upload and convert to Base64
  const handleFileChange = async (event, field) => {
    const file = event.target.files[0];
    if (file) {
      const response = await getSignedUrl(file.name, file.type);
      const signUrl = response?.data?.url || '';
      const fileKey = new URL(signUrl).pathname.split('/').pop();
      // setUploadedFiles((prev) => ({ ...prev, [field]: fileKey }));

      // Update both the file and the signed URL in `uploadedFiles`
      setS3Files((prev) => ({
        ...prev,
        [field]: {
          file: file,
          signUrl: signUrl,
          fileKey: fileKey,
        },
      }));

      const reader = new FileReader();

      reader.onload = (e) => {
        setS3Files((prevState) => ({
          ...prevState,
          [field]: { ...prevState[field], tempUrl: e.target.result }, // Update the selected field with the new file and URL
        }));
      };

      reader.readAsDataURL(file); // Read file as a data URL to display the preview
      event.target.value = null;
    }
  };

  // Handle file removal
  const handleFileRemove = (field) => {
    // setUploadedFiles((prev) => ({ ...prev, [field]: null }));
    setS3Files((prev) => ({
      ...prev,
      [field]: { file: null, signUrl: null, tempUrl: null, fileKey: null },
    }));
  };
  useEffect(() => {
    // Check if all fileKeys exist (mandatory for all)
    const allFileKeysExist = Object.values(s3Files).every(
      (file) => file.fileKey
    );

    // Validate content and file keys
    if (!content || content === '<p><br></p>' || !allFileKeysExist) {
      setIsValidForm(false);
    } else {
      setIsValidForm(true);
    }
  }, [s3Files, content]);

  // Handle save document
  const handleSaveDocument = async (preview = false) => {
    try {
      setLoading(true);
      setIsPreview(preview);
      for (const [field, { file, signUrl }] of Object.entries(s3Files)) {
        if (file && signUrl) {
          await uploadFile(signUrl, file); // Upload the file to AWS using its signed URL
        }
      }

      let contentToSend = content;
      if (questionList.length > 0) {
        questionList.forEach((item) => {
          const placeholder = `{{${item.question}}}`;
          const idReplacement = `{{${item.id}}}`;
          contentToSend = contentToSend.replace(
            new RegExp(placeholder, 'g'),
            idReplacement
          );
        });
      }

      const params = {
        categoryId: docData.categoryId.id,
        subCategoryId: docData.subCategoryId.id,
        childCategoryId: docData.childCategoryId.id,
        name: docData.name,
        content: contentToSend,
        ...(s3Files.headerImage.fileKey && {
          headerImage: s3Files.headerImage.fileKey,
        }),
        ...(s3Files.footerImage.fileKey && {
          footerImage: s3Files.footerImage.fileKey,
        }),
        ...(s3Files.watermarkImage.fileKey && {
          watermarkImage: s3Files.watermarkImage.fileKey,
        }),
        ...(s3Files.signatureImage.fileKey && {
          signature: s3Files.signatureImage.fileKey,
        }),
      };

      await editDocument(documentId, params);

      if (preview) {
        onchangeType('preview', documentId);
      } else {
        onchangeType('list', documentId);
      }
    } catch (error) {
      setLoading(false);
      console.error('Failed to save document', error);
    }
  };

  return (
    <div className="document-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h5>
                    <span
                      onClick={() => onchangeType('list')}
                      className="text-decoration-underline text-white text-regular"
                    >
                      Document{' '}
                    </span>
                    <span className="text-regular">></span>{' '}
                    {docData?.name || ''}
                  </h5>
                </div>
                <div className="col-md-6">
                  <div className="table-filter-div">
                    <button
                      className="btn btn-primary"
                      onClick={() => void handleSaveDocument(false)}
                      disabled={!isValidForm}
                    >
                      {!loading ? (
                        'Save Document'
                      ) : !isPreview ? (
                        <LoaderDots height={20} width={110} />
                      ) : (
                        'Save Document'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="request-table attch-card">
              <div className="rt-head">
                <div className="row align-items-center">
                  <div className="col-9">
                    <div className="ap-btn">
                      <button className="btn p-0 d-flex gap-3 align-items-center textcolor2 font-22">
                        {docData?.name || ''} Document
                      </button>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="prv-btn d-flex justify-content-end">
                      <button
                        onClick={() => {
                          void handleSaveDocument(true);
                        }}
                        className="btn d-flex flex-column justify-content-center p-0 textcolor2 align-items-center gap-1"
                      >
                        <EyeIcon />
                        <span>Preview</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rt-body">
                <div className="attachment-body pt-0">
                  <div className="row d-none">
                    <div className="col-md-6">
                      <div className="file-attach-group mb-4">
                        <label className="fag-label mb-3">
                          Header Image: 2480px*450px
                        </label>
                        <div className="file-attachment-box">
                          <div className="atta-box text-center py-3">
                            <input
                              id="header-image-input"
                              type="file"
                              onChange={(e) =>
                                handleFileChange(e, 'headerImage')
                              }
                            />
                            <label htmlFor="header-image-input">
                              <UploadIcon />
                              Add file
                            </label>
                          </div>
                          <div className="atta-lst">
                            {s3Files?.headerImage?.tempUrl && (
                              <p className="d-flex justify-content-between">
                                {/*<span>{setS3Files?.headerImage?.tempUrl}</span>*/}
                                <img
                                  height={150}
                                  width={150}
                                  src={s3Files?.headerImage?.tempUrl}
                                  alt="icon"
                                  className="img-fluid"
                                />
                                <button
                                  className="btn p-0"
                                  onClick={() =>
                                    handleFileRemove('headerImage')
                                  }
                                >
                                  <SmallCloseButton />
                                </button>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="file-attach-group mb-4">
                        <label className="fag-label mb-3">
                          Footer Image: 2480px*300px
                        </label>
                        <div className="file-attachment-box">
                          <div className="atta-box text-center py-3">
                            <input
                              id="footer-image-input"
                              type="file"
                              onChange={(e) =>
                                handleFileChange(e, 'footerImage')
                              }
                            />
                            <label htmlFor="footer-image-input">
                              <UploadIcon />
                              Add file
                            </label>
                          </div>
                          <div className="atta-lst">
                            {s3Files?.footerImage?.tempUrl && (
                              <p className="d-flex justify-content-between">
                                {/*<span>{uploadedFiles.footerImage}</span>*/}
                                <img
                                  height={150}
                                  width={150}
                                  src={s3Files?.footerImage?.tempUrl}
                                  alt="icon"
                                  className="img-fluid"
                                />
                                <button
                                  className="btn p-0"
                                  onClick={() =>
                                    handleFileRemove('footerImage')
                                  }
                                >
                                  <SmallCloseButton />
                                </button>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="file-attach-group">
                        <label className="fag-label mb-3">
                          Watermark Image: 800px*800px
                        </label>
                        <div className="file-attachment-box">
                          <div className="atta-box text-center py-3">
                            <input
                              id="watermark-image-input"
                              type="file"
                              onChange={(e) =>
                                handleFileChange(e, 'watermarkImage')
                              }
                            />
                            <label htmlFor="watermark-image-input">
                              <UploadIcon />
                              Add file
                            </label>
                          </div>
                          <div className="atta-lst">
                            {s3Files?.watermarkImage?.tempUrl && (
                              <p className="d-flex justify-content-between">
                                {/*<span>{uploadedFiles.watermarkImage}</span>*/}
                                <img
                                  height={150}
                                  width={150}
                                  src={s3Files?.watermarkImage?.tempUrl}
                                  alt="icon"
                                  className="img-fluid"
                                />
                                <button
                                  className="btn p-0"
                                  onClick={() =>
                                    handleFileRemove('watermarkImage')
                                  }
                                >
                                  <SmallCloseButton />
                                </button>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="attachment-body pt-0">
                    <div className="row">
                      {formData &&
                        <TextEditor
                          setContent={setContent}
                          questionList={questionList}
                          content={content}
                        />}
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="attachment-body pt-0">
                    <div className="row d-none">
                      <div className="col-md-6">
                        <div className="file-attach-group mb-4">
                          <label className="fag-label mb-3">
                            Upload signature: 100px*100px
                          </label>
                          <div className="file-attachment-box">
                            <div className="atta-box text-center py-3">
                              <input
                                id="signature-image-input"
                                type="file"
                                onChange={(e) =>
                                  handleFileChange(e, 'signatureImage')
                                }
                              />
                              <label htmlFor="signature-image-input">
                                <UploadIcon />
                                Add file
                              </label>
                            </div>
                            <div className="atta-lst">
                              {s3Files?.signatureImage?.tempUrl && (
                                <p className="d-flex justify-content-between">
                                  {/*<span>{uploadedFiles.signatureImage}</span>*/}
                                  <img
                                    height={150}
                                    width={150}
                                    src={s3Files?.signatureImage?.tempUrl}
                                    alt="icon"
                                    className="img-fluid"
                                  />
                                  <button
                                    className="btn p-0"
                                    onClick={() =>
                                      handleFileRemove('signatureImage')
                                    }
                                  >
                                    <SmallCloseButton />
                                  </button>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*<div className="col-md-6">*/}
                      {/*  <div className="file-attach-group mb-4">*/}
                      {/*    <label className="fag-label mb-3">*/}
                      {/*      Or draw signature here*/}
                      {/*    </label>*/}
                      {/*    <div className="file-attachment-box">*/}
                      {/*      <SignaturePad*/}
                      {/*        handleDrawnSignature={handleDrawnSignature}*/}
                      {/*        docData={docData}*/}
                      {/*      />*/}
                      {/*    </div>*/}
                      {/*  </div>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditDocument;
