import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseButton from '../../components/svgIcons/CloseButton';

const tagList = [
  { id: 'raza', name: 'New raza request' },
  { id: 'dua', name: 'New dua request' },
];

const roleList = [{ id: 'SuperAdmin' }, { id: 'User' }, { id: 'Verifier' }];

const NotificationForm = ({ initialData, handleSubmit, userList }) => {
  const formik = useFormik({
    initialValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      type: initialData?.type || '',
      triggers: initialData?.triggers ||[],
      userIds: (initialData?.userIds || []).map((user) => ({
        id: user.id, // Ensure it's an object with id and type
        type: user.type || 'user', // Default type to 'user' if not specified
      }))
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('title is required'),
      description: Yup.string().required('description is required'),
      type: Yup.string().required('Please select type'),
      userIds: Yup.array()
        .min(1, 'Select at least one user')
        .of(
          Yup.object().shape({
            id: Yup.string().required('User ID is required'),
            type: Yup.string()
              .oneOf(['user', 'role'], 'Invalid type')
              .required('Type is required'),
          })
        ),
      triggers: Yup.array().min(1, 'Select at least tag'),
    }),
    onSubmit: (values, { resetForm }) => {
      const params = initialData ? { ...values, id: initialData.id } : values;
      console.log('=params', params);
      handleSubmit(params);
      resetForm();
      var myOffcanvas = document.getElementById('add_notification');
      var bsOffcanvas = window.bootstrap.Offcanvas.getInstance(myOffcanvas);
      bsOffcanvas.hide();
    },
  });

  // Function to handle checkbox change for userIds (users and roles)
  const handleCheckboxChangeForUser = (e, fieldName, type) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    formik.setFieldValue(
      fieldName,
      isChecked
        ? [...formik.values[fieldName], { id: value, type }]
        : formik.values[fieldName].filter((item) => item.id !== value)
    );
  };

  // Function to handle checkbox change for userIds
  const handleCheckboxChangeForTags = (e, fieldName) => {
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
      id="add_notification"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">
          {initialData
            ? `Notification Master ID: ${initialData.id}`
            : 'Add a new Notification'}
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
          >
            <CloseButton />
          </button>
        </div>
      </div>
      <div className="offcanvas-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="canvas-group mb-4">
            <label>Name of the notification</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="E.g., New Raza {ID} Request"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && (
              <div className="text-danger">{formik.errors.title}</div>
            )}
            <small className="form-text text-muted">
              Use "{'{ID}'}" as a placeholder for dynamic values.
            </small>
          </div>
          <div className="canvas-group mb-4">
            <label>Description of the notification</label>
            <textarea
              className="form-control"
              rows="5"
              name="description"
              placeholder="Type here"
              value={formik.values.description}
              onChange={formik.handleChange}
            ></textarea>
            {formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </div>
          <div className="canvas-group mb-4">
            <label>Notification Type</label>
            <select
              className="form-control"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <option value="">Select Sub Category</option>
              <option value="normal">Normal</option>
              <option value="important">Important</option>
            </select>
            {formik.errors.type && (
              <div className="text-danger">{formik.errors.type}</div>
            )}
          </div>

          {/* Users and Roles in the same Accordion */}
          <div className="accordion mb-4" id="userRoleListAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseUsersRoles"
                  aria-expanded="true"
                  aria-controls="collapseUsersRoles"
                >
                  Select Users and Roles
                </button>
              </h2>
              <div
                id="collapseUsersRoles"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#userRoleListAccordion"
              >
                <div className="accordion-body">
                  <div className="mb-3">
                    <h5>Users</h5>
                    {userList.length > 0 &&
                      userList.map((user) => (
                        <div key={user.id} className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`user-${user.id}`}
                            value={user.id} // Use user.id for value
                            checked={formik.values.userIds.some(
                              (userObj) =>
                                userObj.id === String(user.id) &&
                                userObj.type === 'user'
                            )}
                            onChange={(e) =>
                              handleCheckboxChangeForUser(e, 'userIds', 'user')
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`user-${user.id}`}
                          >
                            {user.firstName} {user.lastName}
                          </label>
                        </div>
                      ))}
                  </div>

                  <div className="mb-3">
                    <h5>Roles</h5>
                    {roleList.length > 0 &&
                      roleList.map((role) => (
                        <div key={role.id} className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`role-${role.id}`}
                            value={role.id} // Use role.id for value
                            checked={formik.values.userIds.some(
                              (userObj) =>
                                userObj.id === String(role.id) &&
                                userObj.type === 'role'
                            )}
                            onChange={(e) =>
                              handleCheckboxChangeForUser(e, 'userIds', 'role')
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`role-${role.id}`}
                          >
                            {role.id}
                          </label>
                        </div>
                      ))}
                  </div>

                  {formik.errors.userIds && (
                    <div className="text-danger">{formik.errors.userIds}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*tags*/}
          <div className="accordion mb-4" id="tagListAccordion">
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
                  Tag this notification with activity
                </button>
              </h2>
              <div
                id="collapseAnswers"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#tagListAccordion"
              >
                <div className="accordion-body">
                  {tagList.length >= 0 &&
                    tagList.map((tag) => (
                      <div key={tag.id} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`tag-${tag.id}`}
                          value={tag.id} // Ensure value is a string
                          checked={formik.values.triggers.includes(tag.id)}
                          onChange={(e) =>
                            handleCheckboxChangeForTags(e, 'triggers')
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`tag-${tag.id}`}
                        >
                          {tag.name}
                        </label>
                      </div>
                    ))}
                  {formik.errors.triggers && (
                    <div className="text-danger">{formik.errors.triggers}</div>
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

export default NotificationForm;
