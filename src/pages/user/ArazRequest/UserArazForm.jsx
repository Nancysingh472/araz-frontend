import React, { useEffect, useState, useCallback } from 'react';
import {
  fetchForms,
  getFormByCategories,
  getFormById,
} from '../../../services/formService';
import { fetchBusinessType } from '../../../services/businessTypeService';
import { getSignedUrl, uploadFile } from '../../../services/fileService';
import SmallCloseButton from '../../../components/svgIcons/SmallCloseButton';
import { toast } from 'react-toastify';
import { createArazRequest } from '../../../services/arazService';
import { useNavigate } from 'react-router-dom';
import { fetchSubCategories } from '../../../services/subCategoryService';
import { fetchChildCategories } from '../../../services/childCategoryService';
import { fetchCategories } from '../../../services/categoryMasterService';
import { getDocumentByCategories } from '../../../services/documentService';
import { fetchDetailsFromITS } from '../../../services/ITSDetailsService';

const UserArazForm = ({ onChangeView, setDocumentId, finalData }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [typeList, setTypeList] = useState([]);
  const [selectedFormData, setSelectedFormData] = useState(null);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [primaryForm, setPrimaryForm] = useState({
    formId: null,
    // businessType: null,
    its_id: '',
    contact: '',
  });
  const [formFields, setFormFields] = useState([]);
  const [fileUploadFields, setFileUploadFields] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState({}); // To store question answers
  const [uploadedFiles, setUploadedFiles] = useState({}); // To track uploaded files per question

  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChildCategory, setSelectedChildCategory] = useState(null);
  const [itsData, setItsData] = useState(null);

  // const loadSelectedFormData = useCallback(async () => {
  //   try {
  //     if (!selectedFormId) {
  //       return;
  //     }
  //     const updatedFields = [];
  //     const fileFields = [];
  //     const result = await getFormById(selectedFormId);
  //     setSelectedFormData(result.data || null);
  //     setQuestionList(result?.data?.questions || []);
  //     const questions = result?.data?.questions || [];
  //
  //     questions.forEach((question) => {
  //       if (question.questionType === 'fileUpload') {
  //         fileFields.push(renderField(question)); // Collect all fileUpload fields
  //       } else {
  //         updatedFields.push(renderField(question)); // Store other fields
  //       }
  //     });
  //     setFormFields(updatedFields);
  //     setFileUploadFields(fileFields);
  //   } catch (err) {
  //     console.error('Failed to load data', err);
  //   }
  // }, [selectedFormId]);

  const loadFormData = useCallback(async () => {
    try {
      if (!selectedCategory || !selectedChildCategory || !selectedSubCategory) {
        return;
      }
      const result = await getFormByCategories(
        selectedCategory,
        selectedSubCategory,
        selectedChildCategory,
      );
      setSelectedFormData(result.data || null);
      setQuestionList(result.data?.questions || []);
      setPrimaryForm((prevForm) => ({
        ...prevForm,
        formId: result.data?.id,
      }));

      const updatedFields = [];
      const fileFields = [];
      const questions = result?.data?.questions || [];

      questions.forEach((question) => {
        if (question.questionType === 'fileUpload') {
          fileFields.push(renderField(question)); // Collect all fileUpload fields
        } else {
          updatedFields.push(renderField(question)); // Store other fields
        }
      });
      setFormFields(updatedFields);
      setFileUploadFields(fileFields);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [selectedCategory, selectedChildCategory, selectedSubCategory]);

  const loadDocData = useCallback(async () => {
    try {
      if (!selectedCategory || !selectedChildCategory || !selectedSubCategory) {
        return;
      }
      const result = await getDocumentByCategories(
        selectedCategory,
        selectedSubCategory,
        selectedChildCategory,
        'form',
      );
      setDocumentId(result?.data?.id || null);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [selectedCategory, selectedChildCategory, selectedSubCategory]);

  useEffect(() => {
    void loadDocData();
  }, [loadDocData]);

  useEffect(() => {
    void loadFormData();
  }, [loadFormData]);

  const loadSubCategories = useCallback(async () => {
    try {
      if (!selectedCategory) {
        setSubCategories([]);
        return;
      }
      const result = await fetchSubCategories(
        null,
        null,
        '',
        null,
        selectedCategory,
      );
      setSubCategories(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [selectedCategory]);

  const loadChildCategories = useCallback(async () => {
    try {
      if (!selectedSubCategory) {
        setChildCategories([]);
        return;
      }
      const result = await fetchChildCategories(
        null,
        null,
        '',
        null,
        selectedSubCategory,
      );
      setChildCategories(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [selectedSubCategory]);

  const loadCategories = useCallback(async () => {
    try {
      const result = await fetchCategories();
      setCategories(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    void loadSubCategories();
  }, [loadSubCategories]);

  useEffect(() => {
    void loadChildCategories();
  }, [loadChildCategories]);

  useEffect(() => {
    const fileFields = [];
    questionList.forEach((question) => {
      if (question.questionType === 'fileUpload') {
        fileFields.push(renderField(question));
      }
    });
    setFileUploadFields(fileFields);
  }, [uploadedFiles, questionList]);

  const loadForms = useCallback(async () => {
    setLoading(true);
    try {
      if (!finalData) {
        return;
      }
      const result = await getFormById(finalData.formId);
      if (result.data) {
        const { child_category_id, sub_category_id, category_id } = result.data;
        setSelectedChildCategory(child_category_id);
        setSelectedSubCategory(sub_category_id);
        setSelectedCategory(category_id);
      }
    } catch (err) {
      console.error('Failed to load data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // const loadBusinessTypes = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const result = await fetchBusinessType();
  //     setTypeList(result.data?.data || []);
  //   } catch (err) {
  //     console.error('Failed to load data', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    void loadForms();
  }, [loadForms]);

  useEffect(() => {
    if (finalData) {
      setPrimaryForm({
        formId: finalData.formId,
        // businessType: null,
        its_id: finalData.its_id,
        contact: finalData.contact,
      });
    }
  }, [finalData]);

  const handleFetchDetailsFromITS = async (itsId) => {
    setLoading(true);
    const result = await fetchDetailsFromITS(itsId);
    setItsData(result.data || null);
    return result.data?.data || setLoading(false);
  };

  useEffect(() => {
    if (itsData && itsData?.Mobile) {
      console.log('==itsData', itsData);
      let cleanedNumber = itsData?.Mobile?.replace('+', '') || '0';

      setPrimaryForm((prevForm) => ({
        ...prevForm,
        contact: cleanedNumber,
      }));
    }
  }, [itsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'its_id' && value.length >= 8) {
      void handleFetchDetailsFromITS(value);
    }
    setPrimaryForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (primaryForm && primaryForm?.formId) {
      setSelectedFormId(primaryForm.formId);
    } else {
      setSelectedFormId(null);
      setSelectedFormData(null);
    }
  }, [primaryForm]);

  const handleQuestionAnswerChange = async (
    questionId,
    event,
    questionType = '',
  ) => {
    let value = event.target.value;
    if (questionType === 'file') {
      const file = event.target.files[0];
      const updatedFiles = uploadedFiles[questionId] || [];

      if (file) {
        const response = await getSignedUrl(file.name, file.type);
        const signUrl = response?.data?.url || '';
        const fileName = new URL(signUrl).pathname.split('/').pop();
        updatedFiles.push({
          file, // Store the file itself
          signUrl, // Store the signed URL
          fileName: file.name, // Optionally store the file name for display
        });
        event.target.value = null;
        setUploadedFiles((prevFiles) => ({
          ...prevFiles,
          [questionId]: updatedFiles,
        }));
        value = fileName;
      }
    }

    setQuestionAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const removeFile = (questionId, fileName) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = prevFiles[questionId].filter(
        (fileData) => fileData.fileName !== fileName,
      );
      return {
        ...prevFiles,
        [questionId]: updatedFiles,
      };
    });

    setQuestionAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: '',
    }));
  };

  const renderField = (question) => {
    const { questionType, questionOptions, id } = question;
    let options = questionOptions || [];
    if (typeof questionOptions === 'string') {
      options = JSON.parse(questionOptions);
    }

    switch (questionType) {
      case 'input':
        return (
          <div className="form-group mb-3" key={id}>
            <label>{question.question}</label>
            <input
              type="text"
              className="form-control form-control2"
              onChange={(e) => handleQuestionAnswerChange(id, e)}
            />
          </div>
        );
      case 'select':
        let optionsValuess = options.find((option) => option.optionType === 'option');
        return (
          <div className="form-group mb-3" key={id}>
            <label>{question.question}</label>
            <select
              className="form-control form-control2"
              onChange={(e) => handleQuestionAnswerChange(id, e)}
            >
              <option value="">Please select</option>
              {optionsValuess.values.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case 'textarea':
        const rowHeight =
          options.find((option) => option.optionType === 'row')?.values || 3; // default to 3 rows
        return (
          <div className="form-group mb-3" key={id}>
            <label>{question.question}</label>
            <textarea
              rows={rowHeight}
              className="form-control form-control2"
              onChange={(e) => handleQuestionAnswerChange(id, e)}
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
                `File ${file.name} exceeds the maximum size of ${maxFileSize}MB.`,
              );
              return;
            }
            if (!fileTypes.includes(fileExtension)) {
              alert(
                `File type ${fileExtension} is not allowed. Please upload a ${fileTypes.join(', ')} file.`,
              );
              return;
            }
          }

          // If all validations pass, handle the files (you can store them in the state or handle upload logic)
          console.log('Files uploaded:', files);
        };

        return (
          <div className="form-group mb-3" key={id}>
            <label>{question.question}</label>
            <div className="attach-file">
              <label htmlFor={`fileUpload-${id}`}>
                <img
                  src="/assets/images/upload-icon.svg"
                  className="img-fluid"
                />
                <span className="attach-label-1">Upload from computer</span>
                <span className="attach-label-2">
                  {' '}
                  Accepted file types: {fileTypes.join(', ')} (max {maxFileSize}
                  MB)
                </span>
              </label>
              <input
                type="file"
                className="form-control d-none"
                id={`fileUpload-${id}`}
                onChange={(e) => handleQuestionAnswerChange(id, e, 'file')}
              />
            </div>
            {uploadedFiles[id]?.map((fileData, index) => (
              <p className="d-flex justify-content-between" key={index}>
                <span>{fileData.fileName}</span>
                <button
                  className="btn p-0"
                  onClick={() => removeFile(id, fileData.fileName)} // Remove the file
                >
                  <SmallCloseButton width={24} height={24} />
                </button>
              </p>
            ))}
          </div>
        );
      case 'radio':
        return (
          <div className="form-group mb-3" key={id}>
            <label>{question.question}</label>
            {options.map((option, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={question.question}
                  id={`radioOption-${id}-${index}`}
                  value={option.values}
                  onChange={() => handleQuestionAnswerChange(id, option.values)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`radioOption-${id}-${index}`}
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

  const submitForm = async () => {
    // Step 1: Validate primary data
    const { formId, its_id, contact } = primaryForm;

    if (
      !formId ||
      !its_id ||
      !contact ||
      !selectedChildCategory ||
      !selectedCategory ||
      !selectedSubCategory
    ) {
      toast.error('Please fill in all the required fields');
      return;
    }

    const childData = childCategories.find(
      (item) => item.id === Number(selectedChildCategory),
    );

    let arazName = '',
      location = '';
    if (childData) {
      const { subCategoryId, name } = childData;
      const categoryId = subCategoryId?.categoryId;
      arazName = `${subCategoryId?.name || ''} dealing in ${name || ''} in ${categoryId?.jamaat?.name || ''} city`;
      location = `${categoryId?.jamaat?.name || ''}, ${categoryId?.jamiat?.name || ''}`;
    }

    // Step 2: Create the submission data
    const submissionData = {
      arazName,
      location,
      formId,
      its_id,
      contact,
      questionAnswers:
        Object.keys(questionAnswers).length > 0
          ? Object.entries(questionAnswers).map(([questionId, answer]) => {
            const question = questionList.find(
              (q) => q.id === parseInt(questionId),
            );
            return {
              questionId: question?.id || questionId, // In case the question is not found, fallback to questionId
              question: question?.question || '', // Fallback to empty string if question not found
              questionType: question?.questionType || '', // Fallback to empty string if questionType not found
              answer: answer,
            };
          })
          : [], // Default to empty array if there are no question answers
    };

    // Step 3: Prepare the file upload list for S3
    const s3Files = [];
    for (const [questionId, fileDataArray] of Object.entries(uploadedFiles)) {
      for (const { file, signUrl } of fileDataArray) {
        if (file && signUrl) {
          s3Files.push({ file, signUrl });
        }
      }
    }

    console.log('Files to be Uploaded to S3:', s3Files);

    // Step 4: Upload the files to S3
    try {
      for (const { file, signUrl } of s3Files) {
        await uploadFile(signUrl, file); // Upload each file to S3 using its signed URL
        console.log(`Successfully uploaded ${file.name} to S3`);
      }
    } catch (error) {
      console.error('Error uploading files to S3:', error);
      alert('There was an error uploading the files.');
      return;
    }

    // Step 5: Submit form data after file upload
    console.log(
      'Final Submission Data:',
      JSON.stringify(submissionData, null, 2),
    );

    onChangeView('preview', submissionData);

    // const response = await createArazRequest(submissionData);
    // const requestId = response?.data?.id;
    // navigate(`/user/UserArazPreview?formId=${formId}&requestId=${requestId}`);
  };

  return (
    <div className="login-form-content px-20">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="login-form-card">
              <div className="login-form-header mb-4">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h5 className="text-white">
                      <u
                        onClick={() => {
                          navigate(`/user/home`);
                        }}
                      >
                        Home
                      </u>{' '}
                      > Fill the form to proceed
                    </h5>
                  </div>
                  <div className="col-4">
                    <div className="next-btn-div text-end">
                      <button onClick={submitForm} className="btn btn-primary">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="login-form-body">
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="form-group mb-3">
                      <label>Select Category *</label>
                      <select
                        className="form-control"
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setSelectedSubCategory(null);
                          setSelectedChildCategory(null);
                        }}
                      >
                        <option value="">Select Category</option>
                        {categories.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="form-group mb-3">
                      <label>Select Sub Category *</label>
                      <select
                        className="form-control"
                        name="subCategory"
                        value={selectedSubCategory}
                        onChange={(e) => {
                          setSelectedSubCategory(e.target.value);
                          setSelectedChildCategory(null);
                        }}
                      >
                        <option value="">Select Sub Category</option>
                        {subCategories.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="form-group mb-3">
                      <label>Select Child Category *</label>
                      <select
                        className="form-control"
                        name="childCategory"
                        value={selectedChildCategory}
                        onChange={(e) =>
                          setSelectedChildCategory(e.target.value)
                        }
                      >
                        <option value="">Select Child Category</option>
                        {childCategories.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/*
                  <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="form-group mb-3">
                      <label>Select Business Type</label>
                      <select
                        className="form-control"
                        name="businessType"
                        value={primaryForm.businessType || ''}
                        onChange={handleChange}
                      >
                        <option value="">Select Type</option>
                        {typeList.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
*/}
                </div>
                <hr className="form-line" />
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="form-group mb-3">
                      <label>ITS ID of applicant *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="its_id"
                        value={primaryForm.its_id}
                        onChange={handleChange}
                        minLength="8"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="form-group mb-3">
                      <label>Contact details *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="contact"
                        value={primaryForm.contact}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <hr className="form-line" />

                {/* Custom Fields Rendering */}
                <div className="row">
                  {formFields.map((field, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                      {field}
                      {(index + 1) % 3 === 0 && <div className="w-100"></div>}
                    </div>
                  ))}
                </div>

                {fileUploadFields.length > 0 && (
                  <>
                    <hr className="form-line" />
                    <div className="row">
                      {fileUploadFields.map((field, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                          {field}
                          {(index + 1) % 3 === 0 && (
                            <div className="w-100"></div>
                          )}
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
    </div>
  );
};

export default UserArazForm;
