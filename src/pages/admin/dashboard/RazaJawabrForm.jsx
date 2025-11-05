import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseButton from '../../../components/svgIcons/CloseButton';
import { toast } from 'react-toastify';

const RazaJawabForm = ({
  idList,
  jawabAnswerData,
  jawabServiceData,
  handleSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      jawab_additional: '',
      jawab_answers: [],
      jawab_recommanded_service: [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      jawab_additional: Yup.string().required(
        'please add additional information'
      ),
      jawab_answers: Yup.array().min(1, 'Select at least one answer'),
      jawab_recommanded_service: Yup.array().min(
        1,
        'Select at least one service'
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      if (idList.length <= 0) {
        toast.error('Please select raza request.');
        return;
      }
      const params = { ...values, raza_ids: idList };
      handleSubmit(params);
      resetForm();
      var myOffcanvas = document.getElementById('add_raza_jawab');
      var bsOffcanvas = window.bootstrap.Offcanvas.getInstance(myOffcanvas);
      bsOffcanvas.hide();
    },
  });

  // Function to handle checkbox change for jawab_answers
  const handleCheckboxChange = (e, fieldName) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    formik.setFieldValue(
      fieldName,
      isChecked
        ? [...formik.values[fieldName], value]
        : formik.values[fieldName].filter((item) => item !== value)
    );
  };

  return (
    <div
      className="offcanvas offcanvas-end custom-canvas-div"
      tabIndex="-1"
      id="add_raza_jawab"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Upload Jawab</h5>
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
        <form onSubmit={formik.handleSubmit}>
          <div className="canvas-group mb-4">
            <label>Add Additional information</label>
            <input
              className="form-control"
              type="text"
              name="jawab_additional"
              value={formik.values.jawab_additional}
              onChange={formik.handleChange}
            />
            {formik.errors.jawab_additional && (
              <div className="text-danger">
                {formik.errors.jawab_additional}
              </div>
            )}
          </div>

          {/* Accordion for jawab_answers */}
          <div className="accordion mb-4" id="jawabAnswersAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseAnswers"
                  aria-expanded="true"
                  aria-controls="collapseAnswers"
                >
                  Suggest answer to the raza
                </button>
              </h2>
              <div
                id="collapseAnswers"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#jawabAnswersAccordion"
              >
                <div className="accordion-body">
                  {jawabAnswerData.length >= 0 &&
                    jawabAnswerData.map((answer) => (
                      <div key={answer.id} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`jawabAnswer-${answer.id}`}
                          value={String(answer.id)} // Ensure value is a string
                          checked={formik.values.jawab_answers.includes(
                            String(answer.id)
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(e, 'jawab_answers')
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`jawabAnswer-${answer.id}`}
                        >
                          {answer.name}
                        </label>
                      </div>
                    ))}
                  {formik.errors.jawab_answers && (
                    <div className="text-danger">
                      {formik.errors.jawab_answers}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Accordion for jawab_recommanded_service */}
          <div className="accordion mb-4" id="jawabServiceAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseServices"
                  aria-expanded="false"
                  aria-controls="collapseServices"
                >
                  Recommended Services
                </button>
              </h2>
              <div
                id="collapseServices"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#jawabServiceAccordion"
              >
                <div className="accordion-body">
                  {jawabServiceData.length >= 0 &&
                    jawabServiceData.map((service) => (
                      <div key={service.id} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`jawabService-${service.id}`}
                          value={String(service.id)} // Ensure value is a string
                          checked={formik.values.jawab_recommanded_service.includes(
                            String(service.id)
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(e, 'jawab_recommanded_service')
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`jawabService-${service.id}`}
                        >
                          {service.name}
                        </label>
                      </div>
                    ))}
                  {formik.errors.jawab_recommanded_service && (
                    <div className="text-danger">
                      {formik.errors.jawab_recommanded_service}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RazaJawabForm;
