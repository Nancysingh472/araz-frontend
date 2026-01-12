import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseButton from '../../components/svgIcons/CloseButton';
import { createBulkJamiat } from '../../services/jamiatService';

const BulkForm = ({ handleBulkSubmit }) => {
  const formik = useFormik({
  initialValues: {
    file: null,
  },
  onSubmit: async (values, { resetForm }) => {
  await handleBulkSubmit(values.file);
  resetForm();
}

});
  return (
    <div
      className="offcanvas offcanvas-end custom-canvas-div"
      tabIndex="-1"
      id="bulkadd_jamiat"
      aria-labelledby="offcanvasRightLabel"
    >
      {/* HEADER */}
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Upload CSV File</h5>

        <div className="canv-right-btn">
          {/* <button
            type="submit"
            className="btn btn-primary"
            disabled={!(formik.isValid && formik.dirty)}
            form="bulkForm"
          >
            Save
          </button> */}

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

      {/* BODY */}
      <div className="offcanvas-body">
        <form id="bulkForm" onSubmit={formik.handleSubmit}>
  {/* FILE INPUT */}
  <div className="canvas-group mb-4">
    <label>Upload File</label>

    <input
      className="form-control"
      type="file"
      name="file"
      accept=".csv"
      onChange={(e) => {
        formik.setFieldValue('file', e.target.files[0]);
        formik.setFieldTouched('file', true);
      }}
    />

    {formik.errors.file && formik.touched.file && (
      <div className="text-danger">{formik.errors.file}</div>
    )}
  </div>

  {/* ✅ SUBMIT BUTTON INSIDE FORM */}
  <button
    type="submit"
    className="btn btn-primary"
    disabled={!formik.values.file}
  >
    Save
  </button>
</form>

      </div>
    </div>
  );
};

export default BulkForm;
