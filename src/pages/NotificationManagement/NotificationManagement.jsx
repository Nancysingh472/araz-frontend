import React, { useEffect, useState, useCallback } from 'react';
import PaginationControls from '../../components/customTable/PaginationControls';
import usePagination from '../../hooks/usePagination';
import SearchInput from '../../components/customTable/SearchInput';
import EditIcon from '../../components/svgIcons/EditIcon';
import DeleteIcon from '../../components/svgIcons/DeleteIcon';
import { format } from 'date-fns';
import LoaderDots from '../../components/common/LoaderDots';
import NotificationForm from './NotificationForm';
import {
  createNotificationMaster,
  deleteNotificationMaster,
  editNotificationMaster,
  fetchNotificationMaster,
} from '../../services/NotificationMasterService';
import { fetchUsers } from '../../services/UserService';

const NotificationManagement = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [userList, setUserList] = useState([]);

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchUsers();
      setUserList(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadNotificationMaster = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchNotificationMaster(page, limit);
      setNotificationList(result.data?.data || []);
      if (result.data && result.data.count) {
        const totalPages = Math.ceil(result.data.count / limit);
        setTotalPages(totalPages);
      } else {
        setTotalPages(0);
      }
    } catch (err) {
      console.error('Failed to load data', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    void loadNotificationMaster();
  }, [loadNotificationMaster]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const handleSubmit = async (data) => {
    try {
      if (data.id) {
        const { id, ...dataWithoutId } = data;
        await editNotificationMaster(id, dataWithoutId);
      } else {
        await createNotificationMaster(data);
      }
    } catch (error) {
      console.error('Error submitting user:', error);
    } finally {
      await loadNotificationMaster();
    }
  };

  const handleDeleteNotificationMaster = async (id) => {
    try {
      await deleteNotificationMaster(id);
    } catch (error) {
      console.error('Error deleting jamaat:', error);
    } finally {
      void (await loadNotificationMaster());
    }
  };

  return (
    <div className="category-master-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>All Notification</h5>
            </div>

            <NotificationForm
              handleSubmit={handleSubmit}
              initialData={formData}
              userList={userList}
            />

            <div className="request-table">
              <div className="rt-head">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    {/*<div className="table-search mb-0">*/}
                    {/*  <SearchInput onSearch={setSearch} delay={500} />*/}
                    {/*</div>*/}
                  </div>
                  <div className="col-sm-6">
                    <div className="table-top-right-btn-list mt-sm-0">
                      {/*<div className="filter-select">*/}
                      {/*  <label>Show :</label>*/}
                      {/*  <select value={status} onChange={handleStatusChange}>*/}
                      {/*    <option value="All">All</option>*/}
                      {/*    <option value="Active">Active</option>*/}
                      {/*    <option value="Inactive">Inactive</option>*/}
                      {/*  </select>*/}
                      {/*</div>*/}
                      <div className="adduser-btn-div">
                        <button
                          className="btn"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#add_notification"
                          aria-controls="offcanvasRight"
                          onClick={() => setFormData(null)}
                        >
                          + Add new
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rt-body">
                <div className="table-responsive">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Unique ID</th>
                        <th>Notification Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Added on</th>
                        <th>Tags</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {!loading ? (
                      <tbody>
                        {notificationList.length > 0 ? (
                          notificationList.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.title}</td>
                              <td>{item?.description}</td>
                              <td>{item?.type}</td>
                              <td>
                                {format(
                                  new Date(item.createdAt),
                                  'dd MMM yyyy'
                                )}
                              </td>
                              <td>
                                {(() => {
                                  let triggersArray = [];
                                  try {
                                    triggersArray = JSON.parse(
                                      item?.triggers || '[]'
                                    ); // Parse string to array
                                  } catch (error) {
                                    console.error(
                                      'Error parsing triggers:',
                                      error
                                    );
                                  }

                                  return triggersArray.length > 0 ? (
                                    triggersArray.map((trigger, index) => (
                                      <span
                                        key={index}
                                        className="badge bg-secondary me-1" // Bootstrap badge styling
                                      >
                                        {trigger}
                                      </span>
                                    ))
                                  ) : (
                                    <span>No triggers</span> // Fallback if array is empty
                                  );
                                })()}
                              </td>

                              <td>
                                <div className="action-btn-list">
                                  <button
                                    className="btn p-0"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#add_notification"
                                    aria-controls="offcanvasRight"
                                    onClick={() => void setFormData(item)}
                                  >
                                    <EditIcon />
                                  </button>

                                  <button
                                    className="btn p-0"
                                    onClick={() =>
                                      handleDeleteNotificationMaster(item.id)
                                    }
                                  >
                                    <DeleteIcon />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="10" className="text-center">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="10" className="text-center">
                            <LoaderDots color="#317470" />
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
                <PaginationControls
                  page={page}
                  limit={limit}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                  handleLimitChange={handleLimitChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationManagement;
