import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFormById } from '../../services/formService';
import { Link } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import CreateSelect from './QuestionComponent/CreateSelect';
import CreateInputFile from './QuestionComponent/CreateFileInput';
import EyeIcon from '../../components/svgIcons/EyeIcon';
import UpArrowIcon from '../../components/svgIcons/UpArrowIcon';
import CreateInput from './QuestionComponent/CreateInput';
import {
  createFormQuestions,
  deleteQuestion,
  editFormQuestions,
} from '../../services/FormQuestions';
import CreateTextareaInput from './QuestionComponent/CreateTextAreaInput';
import CreateRadioInput from './QuestionComponent/CreateRadioInput';

const AdminFormEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const formId = queryParams.get('formId'); // Fetch formId

  const [formData, setFormData] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const loadFormData = useCallback(async () => {
    try {
      const result = await getFormById(formId);
      setFormData(result.data || null);
      setQuestionList(result?.data?.questions || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [formId]);

  const handleSaveQuestion = async (data) => {
    try {
      if (data.id) {
        data.formId = formId;
        const { id, ...dataWithoutId } = data;
        await editFormQuestions(id, dataWithoutId);
      } else {
        data.formId = formId;
        const { id, ...dataWithoutId } = data;
        await createFormQuestions(dataWithoutId);
      }
      await loadFormData();
    } catch (error) {
      console.error('Error creating question :', error);
    }
  };

  const handleDeleteQuestion = async (id, tempId) => {
    try {
      if (id) {
        await deleteQuestion(id);
        void (await loadFormData());
      } else if (tempId) {
        setQuestionList((prevList) =>
          prevList.filter((question) => question.tempId !== tempId)
        );
      }
    } catch (error) {
      console.error('Error deleting Question:', error);
    }
  };

  useEffect(() => {
    void loadFormData();
  }, [loadFormData]);
  return (
    <div className="form-edit-content px-20">
      <QuestionForm setQuestionList={setQuestionList} />

      <div className="container-fluid">
        <div className="admin-card" id="Edit_Form_Top">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h5>
                    <Link
                      to={`/admin/FormMaster`}
                      className="text-decoration-underline text-white text-regular"
                    >
                      Forms
                    </Link>
                    <span className="text-regular">></span> {formData?.name}
                  </h5>
                </div>
                <div className="col-md-6">
                  <div className="table-filter-div">
                    <button
                      className="btn btn-light bg-white border-white"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#Add_Questionl"
                      aria-controls="offcanvasRight"
                    >
                      + Add question
                    </button>
                    {/*<button className="btn btn-primary">Save form</button>*/}
                  </div>
                </div>
              </div>
            </div>
            <div className="request-table attch-card mh-auto mb-3">
              <div className="rt-head">
                <div className="row align-items-center">
                  <div className="col-9">
                    <div className="ap-btn">
                      <button className="btn p-0 d-flex gap-3 align-items-center textcolor2 font-22">
                        Form for {formData?.name}
                        {/*<EditUnderLineIcon/>*/}
                      </button>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="prv-btn d-flex justify-content-end">
                      <button
                        className="btn d-flex flex-column justify-content-center p-0 textcolor2 align-items-center gap-1"
                        onClick={() => {
                          if (questionList.length <= 0) {
                            return;
                          }
                          navigate(`/admin/FormPreview?formId=${formId}`);
                        }}
                      >
                        <EyeIcon />
                        <span>Preview</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {questionList.map((question, index) => {
              return (
                <div key={index}>
                  {question.questionType === 'textarea' && (
                    <CreateTextareaInput
                      question={question}
                      handleSaveQuestion={handleSaveQuestion}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  )}

                  {question.questionType === 'select' && (
                    <CreateSelect
                      question={question}
                      handleSaveQuestion={handleSaveQuestion}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  )}

                  {question.questionType === 'fileUpload' && (
                    <CreateInputFile
                      initialQuestion={question}
                      handleSaveQuestion={handleSaveQuestion}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  )}
                  {question.questionType === 'input' && (
                    <CreateInput
                      question={question}
                      handleSaveQuestion={handleSaveQuestion}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  )}
                  {question.questionType === 'radio' && (
                    <CreateRadioInput
                      question={question}
                      handleSaveQuestion={handleSaveQuestion}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  )}
                </div>
              );
            })}

            {questionList.length <= 0 && (
              <div className="request-table attch-card mh-auto mb-3">
                <div className="rt-head">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <div className="ap-btn">
                        <p className="color-light">
                          Please create questions here
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="back-to-top-div d-flex justify-content-end pt-2">
              <a
                href="#Edit_Form_Top"
                className="btn btn-primary d-flex gap-3 align-items-center"
              >
                Go to top
                <UpArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFormEdit;
