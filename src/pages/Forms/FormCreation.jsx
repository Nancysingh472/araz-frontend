import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseButton from '../../components/svgIcons/CloseButton'; // Optional, for schema validation

const FormCreation = ({
  initialData,
  handleSubmit,
  childCategories,
  subCategories,
  categories,
  setSelectedCategory,
  setSelectedSubCategory,
}) => {
  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      enabled: initialData?.enabled || false,
      categoryId: initialData?.categoryId?.id || '',
      subCategoryId: initialData?.subCategoryId?.id || '',
      childCategoryId: initialData?.childCategoryId?.id || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Form name is required'),
      categoryId: Yup.string().required('Please select a category'),
      subCategoryId: Yup.string().required('Please select a sub category'),
      childCategoryId: Yup.string().required('Please select a child category'),
    }),
    onSubmit: (values, { resetForm }) => {
      const params = initialData ? { ...values, id: initialData.id } : values;
      handleSubmit(params);
      resetForm();
      var myOffcanvas = document.getElementById('add_form');
      var bsOffcanvas = window.bootstrap.Offcanvas.getInstance(myOffcanvas);
      bsOffcanvas.hide();
    },
  });

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    formik.setFieldValue('subCategoryId', '');
    formik.setFieldValue('childCategoryId', '');
    formik.setFieldValue('categoryId', selectedValue);
  };

  const handleSubCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSubCategory(selectedValue);
    formik.setFieldValue('childCategoryId', '');
    formik.setFieldValue('subCategoryId', selectedValue);
  };

  return (
    <div
      className="offcanvas offcanvas-end custom-canvas-div"
      tabIndex="-1"
      id="add_form"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">
          {initialData ? `Form ID: ${initialData.id}` : 'Add a new Form'}
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
            <label>Name of the Form</label>
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
            <label>Select Category</label>
            <select
              className="form-control"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {formik.errors.categoryId && (
              <div className="text-danger">{formik.errors.categoryId}</div>
            )}
          </div>

          {/* Dropdown for sub category selection */}
          <div className="canvas-group mb-4">
            <label>Select Sub Category</label>
            <select
              className="form-control"
              name="subCategoryId"
              value={formik.values.subCategoryId}
              onChange={handleSubCategoryChange}
            >
              <option value="">Select Sub Category</option>
              {subCategories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {formik.errors.subCategoryId && (
              <div className="text-danger">{formik.errors.subCategoryId}</div>
            )}
          </div>

          {/* Dropdown for sub category selection */}
          <div className="canvas-group mb-4">
            <label>Select child Category</label>
            <select
              className="form-control"
              name="childCategoryId"
              value={formik.values.childCategoryId}
              onChange={formik.handleChange}
            >
              <option value="">Select Child Category</option>
              {childCategories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {formik.errors.childCategoryId && (
              <div className="text-danger">{formik.errors.childCategoryId}</div>
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

export default FormCreation;
