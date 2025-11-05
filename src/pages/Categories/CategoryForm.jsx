import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseButton from '../../components/svgIcons/CloseButton'; // Optional, for schema validation

const CategoryForm = ({
  initialData,
  handleSubmit,
  jamaatList,
  jamiatList,
  setSelectedJamiat,
}) => {
  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      enabled: initialData?.enabled || false,
      jamaat: initialData?.jamaat?.id || '',
      jamiat: initialData?.jamiat?.id || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Category name is required'),
      jamaat: Yup.string().required('Please select a Jamaat'),
      jamiat: Yup.string().required('Please select a jamiat'),
    }),
    onSubmit: (values, { resetForm }) => {
      const params = initialData ? { ...values, id: initialData.id } : values;
      handleSubmit(params);
      resetForm();
      var myOffcanvas = document.getElementById('Add_Category');
      var bsOffcanvas = window.bootstrap.Offcanvas.getInstance(myOffcanvas);
      setSelectedJamiat(null);
      bsOffcanvas.hide();
    },
  });

  // Handle Jamiat change event
  const handleJamiatChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedJamiat(selectedValue);
    formik.setFieldValue('jamiat', selectedValue);
    formik.setFieldValue('jamaat', '');
  };

  return (
    <div
      className="offcanvas offcanvas-end custom-canvas-div"
      tabIndex="-1"
      id="Add_Category"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">
          {initialData
            ? `Category ID: ${initialData.id}`
            : 'Add a new category'}
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
            onClick={() => {
              formik.resetForm();
              setSelectedJamiat(null);
            }}
          >
            <CloseButton />
          </button>
        </div>
      </div>
      <div className="offcanvas-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="canvas-group mb-4">
            <label>Name of the category</label>
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
              onChange={handleJamiatChange}
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

          {/* Dropdown for Jamaat selection */}
          <div className="canvas-group mb-4">
            <label>Select Jamaat</label>
            <select
              className="form-control"
              name="jamaat"
              value={formik.values.jamaat}
              onChange={formik.handleChange}
            >
              <option value="">Select Jamaat</option>
              {jamaatList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {formik.errors.jamaat && (
              <div className="text-danger">{formik.errors.jamaat}</div>
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

export default CategoryForm;
