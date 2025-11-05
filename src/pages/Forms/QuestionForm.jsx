import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseButton from '../../components/svgIcons/CloseButton';
import { FIELD_TYPES } from '../../utils/constant';

const QuestionForm = ({ setQuestionList }) => {
  const formik = useFormik({
    initialValues: {
      question: '',
      questionType: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      question: Yup.string().required('Question is required'),
      questionType: Yup.string().required('Please select a question type'),
    }),
    onSubmit: (values, { resetForm }) => {
      setQuestionList((prevList) => [
        ...prevList,
        { ...values, tempId: `temp_${Date.now()}` },
      ]);
      resetForm();
      var myOffcanvas = document.getElementById('Add_Questionl');
      var bsOffcanvas = window.bootstrap.Offcanvas.getInstance(myOffcanvas);
      bsOffcanvas.hide();
    },
  });

  return (
    <div
      className="offcanvas offcanvas-end custom-canvas-div"
      tabIndex="-1"
      id="Add_Questionl"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Add a question</h5>
        <div className="canv-right-btn">
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="btn btn-primary"
            onClick={formik.handleSubmit}
          >
            Save
          </button>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => formik.resetForm()}
          >
            <CloseButton />
          </button>
        </div>
      </div>
      <div className="offcanvas-body">
        <form>
          <div className="canvas-group mb-4">
            <label>Name of the question</label>
            <input
              className="form-control"
              type="text"
              name="question"
              value={formik.values.question}
              onChange={formik.handleChange}
            />
            {formik.errors.question && (
              <div className="text-danger">{formik.errors.question}</div>
            )}
          </div>
          <div className="canvas-group mb-4">
            <label>Type of field</label>
            <select
              className="form-control"
              name="questionType"
              value={formik.values.questionType}
              onChange={formik.handleChange}
            >
              <option value="">Select Type of field</option>
              {FIELD_TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            {formik.errors.questionType && (
              <div className="text-danger">{formik.errors.questionType}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
