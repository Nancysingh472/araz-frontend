import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseButton from '../../components/svgIcons/CloseButton'; // Optional, for schema validation

const JammatForm = ({ initialData, handleSubmit, jamiatList }) => {
  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      enabled: initialData?.enabled || false,
      jamiat: initialData?.jamiat?.id || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Jamaat name is required'),
      jamiat: Yup.string().required('Please select a jamiat'),
    }),
    onSubmit: (values, { resetForm }) => {
      const params = initialData ? { ...values, id: initialData.id } : values;
      handleSubmit(params);
      resetForm();
      var myOffcanvas = document.getElementById('add_jamaat');
      var bsOffcanvas = window.bootstrap.Offcanvas.getInstance(myOffcanvas);
      bsOffcanvas.hide();
    },
  });

  return (
    <div
      className="offcanvas offcanvas-end custom-canvas-div"
      tabIndex="-1"
      id="add_jamaat"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">
          {initialData ? `Jamaat ID: ${initialData.id}` : 'Add a new Jamaat'}
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
            <label>Name of the Jamaat</label>
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

          {/* Dropdown for jamiat selection */}
          <div className="canvas-group mb-4">
            <label>Select Jamiat</label>
            <select
              className="form-control"
              name="jamiat"
              value={formik.values.jamiat}
              onChange={formik.handleChange}
            >
              <option value="">Select Jamiat</option>
              {jamiatList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {formik.errors.jamiat && (
              <div className="text-danger">{formik.errors.jamiat}</div>
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

export default JammatForm;
