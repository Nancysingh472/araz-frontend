import React, { useCallback, useState, useEffect } from 'react';
import { getFormById } from '../../services/formService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UploadIcon from '../../components/svgIcons/UploadIcon';

const AdminFormPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const formId = queryParams.get('formId'); // Fetch formId

  const [formData, setFormData] = useState(null);
  const [formFields, setFormFields] = useState([]);
  const [fileUploadFields, setFileUploadFields] = useState([]); // Store multiple file upload fields

  const loadFormData = useCallback(async () => {
    try {
      const updatedFields = [];
      const fileFields = [];
      const result = await getFormById(formId);
      const questionsList = result?.data?.questions || [];
      setFormData(result?.data);
      questionsList.forEach((question) => {
        if (question.questionType === 'fileUpload') {
          fileFields.push(renderField(question)); // Collect all fileUpload fields
        } else {
          updatedFields.push(renderField(question)); // Store other fields
        }
      });
      // Update the form fields and file upload fields
      setFormFields(updatedFields);
      setFileUploadFields(fileFields);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [formId]);

  useEffect(() => {
    void loadFormData();
  }, [loadFormData]);

  const renderField = (question) => {
    const { questionType, questionOptions } = question;
    let options = [];
    if (questionOptions) {
      options = JSON.parse(questionOptions);
    }

    switch (questionType) {
      case 'input':
        return (
          <div className="form-group mb-3">
            <label>{question.question}</label>
            <input type="text" className="form-control form-control2" />
          </div>
        );
      case 'select':
        let values = options.find((option) => option.optionType === 'options')?.value || [];
        return (
          <div className="form-group mb-3">
            <label>{question.question}</label>
            <select className="form-control form-control2">
              {values.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
        );
      case 'textarea':
        const rowHeight =
          options.find((option) => option.optionType === 'row')?.values || 3; // default to 3 rows
        return (
          <div className="form-group mb-3">
            <label>{question.question}</label>
            <textarea
              rows={rowHeight}
              className="form-control form-control2"
            ></textarea>
          </div>
        );
      case 'fileUpload':
        const fileTypes =
          options.find((option) => option.optionType === 'fileType')?.values ||
          [];
        const maxFileSize =
          options.find((option) => option.optionType === 'fileSize')?.values ||
          2; // Default to 2MB if not specified
        const minFiles =
          options.find((option) => option.optionType === 'minFiles')?.values ||
          1; // Default to 1 if not specified

        const handleFileChange = (event) => {
          const files = event.target.files;

          // Validate number of files
          if (files.length < minFiles) {
            alert(`Please upload at least ${minFiles} file(s).`);
            return;
          }

          // Validate file types and size
          for (let file of files) {
            const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (fileSizeInMB > maxFileSize) {
              alert(
                `File ${file.name} exceeds the maximum size of ${maxFileSize}MB.`
              );
              return;
            }
            if (!fileTypes.includes(fileExtension)) {
              alert(
                `File type ${fileExtension} is not allowed. Please upload a ${fileTypes.join(', ')} file.`
              );
              return;
            }
          }

          // If all validations pass, handle the files (you can store them in the state or handle upload logic)
          console.log('Files uploaded:', files);
        };

        return (
          <>
            <div className="file-attach-group mb-4">
              <label className="fag-label mb-3">{question.question}</label>
              <div className="file-attachment-box">
                <div className="atta-box text-center py-3">
                  <input
                    id="footer-image-input"
                    type="file"
                    onChange={(e) => handleFileChange(e, 'footerImage')}
                  />
                  <label htmlFor="footer-image-input">
                    <UploadIcon />
                    Add file
                  </label>
                  <p className="text-muted">
                    Accepted file types: {fileTypes.join(', ')} (max{' '}
                    {maxFileSize}MB)
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      case 'radio':
        return (
          <div className="form-group mb-3">
            <label>{question.question}</label>
            {options.map((option, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={question.question} // Ensure all options have the same name so only one can be selected
                  id={`radioOption-${index}`}
                  value={option.values}
                />
                <label
                  className="form-check-label"
                  htmlFor={`radioOption-${index}`}
                >
                  {option.values}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="preview-form-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h5>
                    <Link
                      to={`/admin/FormMaster`}
                      className="text-decoration-underline text-white text-regular"
                    >
                      Forms
                    </Link>
                    <span className="text-regular"> > </span>
                    <Link
                      to={`/admin/FormEdit?formId=${formId}`}
                      className="text-decoration-underline text-white text-regular"
                    >
                      {formData?.name || ''}
                    </Link>
                    <span className="text-regular"> > </span> Preview
                  </h5>
                </div>
                <div className="col-sm-4">
                  <div className="table-filter-div">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        navigate(`/admin/FormEdit?formId=${formId}`);
                      }}
                    >
                      Exit preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pre-document-card">
            <div className="pre-doc-title">
              <h5 className="textcolor2 text-uppercase">
                {formData?.name} form
              </h5>
            </div>
            <div className="doc-box p-0 border-0">
              <div className="row">
                {formFields.map((field, index) => (
                  <div className="col-md-4 mb-3" key={index}>
                    {field}
                    {/* Ensure that after every third field, we add a horizontal separator */}
                    {(index + 1) % 3 === 0 && <div className="w-100"></div>}
                  </div>
                ))}
              </div>

              {/* Check if there are file upload fields, and only then add a horizontal line before the file upload section */}
              {fileUploadFields.length > 0 && (
                <>
                  <hr className="form-line" />
                  <div className="row">
                    {fileUploadFields.map((field, index) => (
                      <div className="col-md-4 mb-3" key={index}>
                        {field}
                        {/* Ensure that after every third file upload field, we add a horizontal separator */}
                        {(index + 1) % 3 === 0 && <div className="w-100"></div>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFormPreview;
