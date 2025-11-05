import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseButton from '../../components/svgIcons/CloseButton';
import {
  EmailValidation,
  StrictPasswordValidation,
} from '../../utils/validationSchemas';

const roleList = [
  { id: 1, name: 'Super Admin' },
  { id: 2, name: 'User' },
  { id: 3, name: 'Verifier' },
];

const AdminUserForm = ({
  initialData,
  handleSubmit,
  jamaatList,
  jamiatList,
  setSelectedJamiat,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      its_id: initialData?.its_id || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      jamaat_id: initialData?.jamaat_id || '',
      jamiat_id: initialData?.jamiat_id || '',
      userName: initialData?.userName || '',
      password: initialData?.password || '',
      role_id: initialData?.role_id || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().required('firstName is required'),
      lastName: Yup.string().required('lastName is required'),
      its_id: !initialData
        ? Yup.string().required('its_id is required')
        : Yup.string(),
      phone: Yup.string().required('phone is required'),
      userName: Yup.string().required('userName is required'),
      password: !initialData
        ? StrictPasswordValidation.required('Password is required')
        : Yup.string(),
      email: EmailValidation.required('Email is required'),
      jamaat_id: Yup.string().required('Please select a Jamaat'),
      jamiat_id: Yup.string().required('Please select a jamiat'),
      role_id: Yup.string().required('Please select a role'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values.role_id) {
        values.role_id = Number(values.role_id); // Convert role_id to number
      }
      const params = initialData ? { ...values, id: initialData.id } : values;
      handleSubmit(params);
      resetForm();
      var myOffcanvas = document.getElementById('add_staff');
      var bsOffcanvas = window.bootstrap.Offcanvas.getInstance(myOffcanvas);
      setSelectedJamiat(null);
      bsOffcanvas.hide();
    },
  });

  // Handle Jamiat change event
  const handleJamiatChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedJamiat(selectedValue);
    formik.setFieldValue('jamiat_id', selectedValue);
    formik.setFieldValue('jamaat_id', '');
  };

  return (
    <div
      className="offcanvas offcanvas-end custom-canvas-div"
      tabIndex="-1"
      id="add_staff"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">
          {initialData ? `User ID: ${initialData.id}` : 'Add a new User'}
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
          {/* First Name */}
          <div className="canvas-group mb-4">
            <label>First Name</label>
            <input
              className="form-control"
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            {formik.errors.firstName && (
              <div className="text-danger">{formik.errors.firstName}</div>
            )}
          </div>

          {/* Last Name */}
          <div className="canvas-group mb-4">
            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            {formik.errors.lastName && (
              <div className="text-danger">{formik.errors.lastName}</div>
            )}
          </div>

          {/* ITS ID */}
          {!initialData && (
            <div className="canvas-group mb-4">
              <label>ITS ID</label>
              <input
                className="form-control"
                type="text"
                name="its_id"
                value={formik.values.its_id}
                onChange={formik.handleChange}
              />
              {formik.errors.its_id && (
                <div className="text-danger">{formik.errors.its_id}</div>
              )}
            </div>
          )}

          {/* Email */}
          <div className="canvas-group mb-4">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>

          {/* Phone */}
          <div className="canvas-group mb-4">
            <label>Phone</label>
            <input
              className="form-control"
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && (
              <div className="text-danger">{formik.errors.phone}</div>
            )}
          </div>

          {/* Username */}
          <div className="canvas-group mb-4">
            <label>Username</label>
            <input
              className="form-control"
              type="text"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
            {formik.errors.userName && (
              <div className="text-danger">{formik.errors.userName}</div>
            )}
          </div>

          {/* Password */}
          {!initialData && (
            <div className="canvas-group mb-4">
              <label>Password</label>
              <input
                className="form-control"
                type="text"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>
          )}

          {/*Dropdown for Role selection*/}
          <div className="canvas-group mb-4">
            <label>Select Role</label>
            <select
              className="form-control"
              name="role_id"
              value={formik.values.role_id}
              onChange={formik.handleChange}
            >
              <option value="">Select Role</option>
              {roleList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {formik.errors.role_id && (
              <div className="text-danger">{formik.errors.role_id}</div>
            )}
          </div>

          {/* Dropdown for Jamiat selection */}
          <div className="canvas-group mb-4">
            <label>Select Jamiat</label>
            <select
              className="form-control"
              name="jamiat_id"
              value={formik.values.jamiat_id}
              onChange={handleJamiatChange}
            >
              <option value="">Select Jamiat</option>
              {jamiatList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {formik.errors.jamiat_id && (
              <div className="text-danger">{formik.errors.jamiat_id}</div>
            )}
          </div>

          {/* Dropdown for Jamaat selection */}
          <div className="canvas-group mb-4">
            <label>Select Jamaat</label>
            <select
              className="form-control"
              name="jamaat_id"
              value={formik.values.jamaat_id}
              onChange={formik.handleChange}
            >
              <option value="">Select Jamaat</option>
              {jamaatList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {formik.errors.jamaat_id && (
              <div className="text-danger">{formik.errors.jamaat_id}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUserForm;
