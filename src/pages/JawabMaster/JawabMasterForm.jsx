import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseButton from '../../components/svgIcons/CloseButton';

const JawabMasterForm = ({ initialData, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      type: initialData?.type || '',
      cta_title: initialData?.cta_title || '',
      cta_action: initialData?.cta_action || '',
      cta_text: initialData?.cta_text || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Type name is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const params = initialData ? { ...values, id: initialData.id } : values;
      handleSubmit(params);
      resetForm();
      var myOffcanvas = document.getElementById('add_jawab_master');
      var bsOffcanvas = window.bootstrap.Offcanvas.getInstance(myOffcanvas);
      bsOffcanvas.hide();
    },
  });

  return (
    <div
      className="offcanvas offcanvas-end custom-canvas-div"
      tabIndex="-1"
      id="add_jawab_master"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">
          {initialData
            ? `Jawab ID: ${initialData.id}`
            : 'Add a new business type'}
        </h5>
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
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
          </div>

          {/* Dropdown for category selection */}
          <div className="canvas-group mb-4">
            <label>Select Type</label>
            <select
              className="form-control"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <option value="">Select Category</option>
              <option value="service">service</option>
              <option value="answer">answer</option>
            </select>
            {formik.errors.type && (
              <div className="text-danger">{formik.errors.type}</div>
            )}
          </div>

          <div className="canvas-group mb-4">
            <label>cta_title</label>
            <input
              className="form-control"
              type="text"
              name="cta_title"
              value={formik.values.cta_title}
              onChange={formik.handleChange}
            />
            {formik.errors.cta_title && (
              <div className="text-danger">{formik.errors.cta_title}</div>
            )}
          </div>

          <div className="canvas-group mb-4">
            <label>cta_action</label>
            <input
              className="form-control"
              type="text"
              name="cta_action"
              value={formik.values.cta_action}
              onChange={formik.handleChange}
            />
            {formik.errors.cta_action && (
              <div className="text-danger">{formik.errors.cta_action}</div>
            )}
          </div>

          <div className="canvas-group mb-4">
            <label>cta_text</label>
            <input
              className="form-control"
              type="text"
              name="cta_text"
              value={formik.values.cta_text}
              onChange={formik.handleChange}
            />
            {formik.errors.cta_text && (
              <div className="text-danger">{formik.errors.cta_text}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JawabMasterForm;
