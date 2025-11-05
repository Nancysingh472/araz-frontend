import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseButton from '../../components/svgIcons/CloseButton'; // Optional, for schema validation

const JamiatForm = ({ initialData, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      enabled: initialData?.enabled || false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Jamiat name is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const params = initialData ? { ...values, id: initialData.id } : values;
      handleSubmit(params);
      resetForm();
      var myOffcanvas = document.getElementById('add_jamiat');
      var bsOffcanvas = window.bootstrap.Offcanvas.getInstance(myOffcanvas);
      bsOffcanvas.hide();
    },
  });

  return (
    <div
      className="offcanvas offcanvas-end custom-canvas-div"
      tabIndex="-1"
      id="add_jamiat"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">
          {initialData ? `Jamiat ID: ${initialData.id}` : 'Add a new Jamiat'}
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
            <label>Name of the Jamiat</label>
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

          {/* Checkbox for 'Status' */}
          <div className="canvas-group mb-4">
            <label>
              <input
                type="checkbox"
                name="enabled"
                checked={formik.values.enabled}
                onChange={formik.handleChange}
              />{' '}
              Enabled
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JamiatForm;
