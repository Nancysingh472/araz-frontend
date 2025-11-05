import React from 'react';
import {
  editNotification,
  fetchNotification,
} from '../../services/NotificationService';
import NotificationRightArrow from '../svgIcons/NotificationRightArrow';
import { format } from 'date-fns';
import useSWR from 'swr';

// Function to fetch notifications
const fetcher = async () => {
  const result = await fetchNotification(); // Replace with your actual fetch function
  return result?.data?.data || [];
};

const NotificationsSection = () => {
  const {
    data: notificationData,
    error,
    mutate,
  } = useSWR('/notifications', fetcher, {
    refreshInterval: 30000, // 30 sec
  });

  const handleRead = async (item) => {
    try {
      const { id, createdAt, updatedAt, ...otherData } = item;
      const params = { ...otherData, isRead: true };
      await editNotification(id, params);
      mutate();
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  if (error) return <div>Error loading notifications.</div>;
  if (!notificationData) return <div>No data available.</div>;

  return (
    <div className="notification-div position-relative">
      <button
        className="btn notification-btn"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#admin_notification_modal"
      >
        {notificationData.length > 0 && (
          <span className="ntf-count">{notificationData.length}</span>
        )}
        <img
          src="/assets/images/notification-icon.svg"
          alt="menu"
          className="img-fluid"
        />
      </button>

      <div
        className="modal fade notification-modal header-modal"
        id="admin_notification_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="notification-box">
              <div className="ntf-head">
                <h5>Notifications</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.402 0.618517C26.2125 0.428667 25.9875 0.278046 25.7397 0.175278C25.492 0.0725101 25.2264 0.0196116 24.9582 0.0196116C24.69 0.0196116 24.4244 0.0725101 24.1766 0.175278C23.9289 0.278046 23.7038 0.428667 23.5144 0.618517L13.5 10.6124L3.48562 0.598037C3.29602 0.408436 3.07093 0.258036 2.8232 0.155424C2.57548 0.0528129 2.30997 1.99777e-09 2.04183 0C1.77369 -1.99778e-09 1.50818 0.0528129 1.26045 0.155424C1.01273 0.258036 0.787639 0.408436 0.598037 0.598037C0.408436 0.787639 0.258036 1.01273 0.155424 1.26045C0.0528129 1.50818 -1.99777e-09 1.77369 0 2.04183C1.99778e-09 2.30997 0.0528129 2.57548 0.155424 2.8232C0.258036 3.07093 0.408436 3.29602 0.598037 3.48562L10.6124 13.5L0.598037 23.5144C0.408436 23.704 0.258036 23.9291 0.155424 24.1768C0.0528129 24.4245 0 24.69 0 24.9582C0 25.2263 0.0528129 25.4918 0.155424 25.7395C0.258036 25.9873 0.408436 26.2124 0.598037 26.402C0.787639 26.5916 1.01273 26.742 1.26045 26.8446C1.50818 26.9472 1.77369 27 2.04183 27C2.30997 27 2.57548 26.9472 2.8232 26.8446C3.07093 26.742 3.29602 26.5916 3.48562 26.402L13.5 16.3876L23.5144 26.402C23.704 26.5916 23.9291 26.742 24.1768 26.8446C24.4245 26.9472 24.69 27 24.9582 27C25.2263 27 25.4918 26.9472 25.7395 26.8446C25.9873 26.742 26.2124 26.5916 26.402 26.402C26.5916 26.2124 26.742 25.9873 26.8446 25.7395C26.9472 25.4918 27 25.2263 27 24.9582C27 24.69 26.9472 24.4245 26.8446 24.1768C26.742 23.9291 26.5916 23.704 26.402 23.5144L16.3876 13.5L26.402 3.48562C27.1802 2.70741 27.1802 1.39673 26.402 0.618517Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              <div className="ntf-body">
                {notificationData.length > 0 &&
                  notificationData.map((item) => (
                    <div key={item.id} className="ntf-box">
                      <div className="ntf-lt">
                        <h6 className="text-primary">{item?.title}</h6>
                        <p>
                          {format(
                            new Date(item.createdAt),
                            'dd MMM yyyy HH:mm'
                          )}
                          <span
                            className={
                              item?.type !== 'normal' ? 'text-danger' : ''
                            }
                          >
                            {item?.type}
                          </span>
                        </p>
                      </div>
                      <div className="ntf-btn">
                        <button
                          className="btn p-0"
                          onClick={() => handleRead(item)}
                        >
                          <NotificationRightArrow />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;
