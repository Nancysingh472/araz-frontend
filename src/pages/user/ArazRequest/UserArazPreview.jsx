import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocumentPreview } from '../../../services/documentService';
import { createArazRequest } from '../../../services/arazService';
import { fetchNotificationMaster } from '../../../services/NotificationMasterService';
import { createNotification } from '../../../services/NotificationService';
import { fetchUsers } from '../../../services/UserService';

const UserArazPreview = ({ documentId, finalData, onChangeView }) => {
  const navigate = useNavigate();
  const [base64Data, setBase64Data] = useState('');
  const [notificationMasterData, setNotificationMasterData] = useState([]);

  const loadPreview = useCallback(async () => {
    try {
      if (!documentId) {
        return;
      }
      const result = await getDocumentPreview(documentId, true, false);
      const updatedHtml = replacePlaceholders(result?.data || '', finalData);
      setBase64Data(updatedHtml);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [documentId, finalData]);

  useEffect(() => {
    loadPreview();
  }, [loadPreview]);

  const loadNotificationMasterData = useCallback(async () => {
    try {
      const result = await fetchNotificationMaster(null, null, 'raza');
      setNotificationMasterData(result?.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, []);

  useEffect(() => {
    loadNotificationMasterData();
  }, [loadNotificationMasterData]);

  const addNotification = async (razaId = '') => {
    if (notificationMasterData.length <= 0) {
      return;
    }

    const razaNotification = notificationMasterData[0];

    // Replace {ID} in title with razaId
    const title = razaNotification.title.replace('{ID}', razaId);
    console.log('Updated Title:', title);

    // Parse the userIds field (array of {id, type} objects)
    let userIds = razaNotification.userIds;

    // Iterate through userIds and handle each entry separately
    for (let user of userIds) {
      if (user.type === 'user') {
        // For type "user", save the userId as is
        const newNotification = {
          title,
          description: razaNotification.description,
          type: razaNotification.type,
          userId: user.id, // Save the userId directly from the data
          isRead: false, // or use the value from req.body if needed
        };

        console.log('New Notification for User:', newNotification);

        // Save the new notification for the specific user
        await createNotification(newNotification);
      } else if (user.type === 'role') {
        // For type "role", fetch all users who have this role
        const role = user.id; // The role ID

        // Fetch all users with the specified role (adjust your query logic as needed)
        const usersWithRole = await fetchUsers(null, null, role);
        const usersWithRoleList = usersWithRole?.data?.data || [];

        // Send notification to all users who have this role
        for (let roleUser of usersWithRoleList) {
          const newNotificationForRoleUser = {
            title,
            description: razaNotification.description,
            type: razaNotification.type,
            userId: roleUser.id, // Send the notification to the role user
            isRead: false, // or use the value from req.body if needed
          };

          console.log(
            'New Notification for Role User:',
            newNotificationForRoleUser
          );

          // Save the new notification for each user in the role
          await createNotification(newNotificationForRoleUser);
        }
      }
    }
  };

  const onSubmit = async (type = '') => {
    try {
      if (type === 'draft') {
        finalData.status = 'draft';
      }
      delete finalData.arazName;
      delete finalData.location;
      const response = await createArazRequest(finalData);
      if (response && response.status) {
        await addNotification(response.data.id);
        type === 'draft'
          ? navigate('/user/draftRequest')
          : navigate('/user/Dashboard');
      }
    } catch (e) {
      console.error('error', e);
    }
  };

  const replacePlaceholders = (htmlString, finalData) => {
    let modifiedHtml = htmlString;
    if (htmlString && finalData && finalData.questionAnswers.length > 0) {
      finalData.questionAnswers.forEach((answerObj) => {
        const placeholder = `{{${answerObj.questionId}}}`;
        modifiedHtml = modifiedHtml.split(placeholder).join(answerObj.answer);
      });
      return modifiedHtml;
    }
    return htmlString;
  };

  return (
    <div className="login-form-content px-20">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="login-form-card">
              <div className="login-form-header mb-4">
                <div className="row align-items-center">
                  <div className="col-5">
                    <h5 className="text-white">
                      <span onClick={() => onChangeView('form', finalData)}>
                        <u>Form</u>
                      </span>{' '}
                      > Araz Preview
                    </h5>
                  </div>
                  <div className="col-7">
                    <div className="next-btn-div d-flex flex-wrap gap-2 text-end justify-content-end">
                      <button
                        type="button"
                        onClick={() => onSubmit('draft')}
                        className="btn btn-primary2"
                      >
                        Save as draft
                      </button>
                      <button
                        type="button"
                        onClick={() => onSubmit()}
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="login-form-body">
                <div className="row">
                  <div className="col-md-5">
                    {base64Data ? (
                      <div className="araz-card overflow-auto">
                        <div dangerouslySetInnerHTML={{ __html: base64Data }} />
                      </div>
                    ) : (
                      <div>
                        <p>No preview available.</p>
                      </div>
                    )}
                  </div>
                  <div className="col-md-7">
                    <div className="araz-info-card">
                      <div className="araz-info-group">
                        <div className="araz-info-icon">
                          <img
                            src="/assets/images/name-icon.svg"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>
                        <div className="araz-info-text">
                          <p>Your araz is for</p>
                          <h5>{finalData?.arazName || '-'}</h5>
                        </div>
                      </div>

                      <div className="araz-info-group">
                        <div className="araz-info-icon">
                          <img
                            src="/assets/images/location-icon.svg"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>
                        <div className="araz-info-text">
                          <p>Location of business</p>
                          <h5>{finalData?.location || '-'}</h5>
                        </div>
                      </div>

                      {/*<div className="araz-info-group">*/}
                      {/*  <div className="araz-info-icon">*/}
                      {/*    <img*/}
                      {/*      src="/assets/images/bag-icon.svg"*/}
                      {/*      alt="img"*/}
                      {/*      className="img-fluid"*/}
                      {/*    />*/}
                      {/*  </div>*/}
                      {/*  <div className="araz-info-text">*/}
                      {/*    <p>Type of business</p>*/}
                      {/*    <h5>Hardware, Tools and Machinery</h5>*/}
                      {/*  </div>*/}
                      {/*</div>*/}

                      {/*<div className="araz-info-group">*/}
                      {/*  <div className="araz-info-icon">*/}
                      {/*    <img*/}
                      {/*      src="/assets/images/star-icon.svg"*/}
                      {/*      alt="img"*/}
                      {/*      className="img-fluid"*/}
                      {/*    />*/}
                      {/*  </div>*/}
                      {/*  <div className="araz-info-text">*/}
                      {/*    <p>First name of your choice</p>*/}
                      {/*    <h5>Saifee Hardware Store</h5>*/}
                      {/*  </div>*/}
                      {/*</div>*/}

                      {finalData.questionAnswers.length > 0 &&
                        finalData.questionAnswers.map((item) => (
                          <div
                            className="araz-info-group"
                            key={item.questionId}
                          >
                            <div className="araz-info-icon">
                              <img
                                src="/assets/images/drafts.png"
                                alt="img"
                                className="img-fluid"
                              />
                            </div>
                            <div className="araz-info-text">
                              <p>{item.question}</p>
                              <h5>{item.answer}</h5>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserArazPreview;
