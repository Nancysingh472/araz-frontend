import React, { useCallback, useState, useEffect } from 'react';

import EyeIcon from '../../components/svgIcons/EyeIcon';
import { editDocument, getDocumentById } from '../../services/documentService';
import LoaderDots from '../../components/common/LoaderDots';

import { Editor } from "@tinymce/tinymce-react";

const AdminBulkEditDocument = ({ onchangeType, documentId }) => {
  const [docData, setDocData] = useState(null);
  const [isValidForm, setIsValidForm] = useState(true);
  const [formData, setFormData] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [content, setContent] = useState('<p></p>');
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const loadDocData = useCallback(async () => {
    try {
      const result = await getDocumentById(documentId);
      setDocData(result.data || null);
      setContent(result.data.content);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [documentId]);

  useEffect(() => {
    void loadDocData();
  }, [loadDocData]);

  const loadFormData = useCallback(async () => {
    try {
      setFormData({});
      setQuestionList([]);
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
          questionReplacement,
        );
      });

      setContent(contentWithQuestions);
    }
  }, [docData, questionList]);

  // Handle save document
  const handleSaveDocument = async (preview = false) => {
    try {
      setLoading(true);
      setIsPreview(preview);

      let contentToSend = content;
      if (questionList.length > 0) {
        questionList.forEach((item) => {
          const placeholder = `{{${item.question}}}`;
          const idReplacement = `{{${item.question}}}`;
          contentToSend = contentToSend.replace(
            new RegExp(placeholder, 'g'),
            idReplacement,
          );
        });
      }

      const params = {
        content: contentToSend,
      };

      await editDocument(documentId, params, true);

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
                <div className="mb-5">
                  <div className="attachment-body pt-0">
                    <div className="row">
                      <Editor
                        onEditorChange={e => setContent(e)} init={{
                        plugins: ['code', 'table', 'image'],
                        automatic_uploads: true,
                        file_picker_types: 'image',
                        content_style: `
                                              @font-face {
  font-family: 'AlKanz';
  src: url('../public/fonts/al-kanz/kanz-al-marjaan-webfont.woff2') format('woff2'),
  url('../public/fonts/al-kanz/kanz-al-marjaan-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
                              body { font-family: 'AlKanz', sans-serif; }
                        `,
                        font_family_formats: "Al Kanz=AlKanz, sans-serif; Arial=arial,helvetica,sans-serif; Times New Roman=times new roman,times,serif; Courier New=courier new,courier,monospace;",
                        toolbar: 'alignleft aligncenter alignright alignjustify variablesDropdown image code bold italic',
                        setup: (editor) => {
                          editor.ui.registry.addMenuButton("variablesDropdown", {
                            text: "Select variables",
                            fetch: (callback) => {
                              callback([
                                {
                                  type: "menuitem",
                                  text: 'Araz requests',
                                  onAction: () => {
                                    editor.insertContent(`{{REQUESTS}}`);
                                  },
                                },
                                {
                                  type: "menuitem",
                                  text: 'From Date',
                                  onAction: () => {
                                    editor.insertContent(`{{FROM_DATE}}`);
                                  },
                                },
                                {
                                  type: "menuitem",
                                  text: 'To Date',
                                  onAction: () => {
                                    editor.insertContent(`{{TO_DATE}}`);
                                  },
                                },
                                {
                                  type: "menuitem",
                                  text: 'Total',
                                  onAction: () => {
                                    editor.insertContent(`{{TOTAL}}`);
                                  },
                                }
                              ]);
                            },
                          });
                        },
                        file_picker_callback: (cb, value, meta) => {
                          const input = document.createElement('input');
                          input.setAttribute('type', 'file');
                          input.setAttribute('accept', 'image/*');

                          input.addEventListener('change', (e) => {
                            const file = e.target.files[0];

                            if (file) {
                              const reader = new FileReader();

                              reader.onload = (event) => {
                                const base64 = event.target.result; // Base64 string
                                cb(base64, { title: file.name }); // Insert image in the editor
                              };

                              reader.readAsDataURL(file); // Convert image to Base64
                            }
                          });

                          input.click();
                        },
                      }} value={content} apiKey={'6hk1fx2l4fkz6chacbn6e7oyflei77j1nl0ws67fbe391oop'}/>
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

export default AdminBulkEditDocument;
