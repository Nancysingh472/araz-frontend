import React, { useEffect, useState, useCallback } from 'react';
import PaginationControls from '../../../components/customTable/PaginationControls';
import usePagination from '../../../hooks/usePagination';
import { format } from 'date-fns';

import LoaderDots from '../../../components/common/LoaderDots';
import { fetchUserSupportQuery } from '../../../services/userSupportService';
import UserSupportComments from './UserSupportComments';
import { AuthContext } from '../../../contexts/AuthContext';

const UserSupportTickets = () => {
  const [userQueryList, setUserQueryList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [supportId, setSupportId] = useState('');
  const [supportStatus, setSupportStatus] = useState('');
  const [status, setStatus] = useState('');

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    // setPage(0); // Reset page to 0 when status changes
  };

  const loadBusinessTypes = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchUserSupportQuery(page, limit, search, status);
      setUserQueryList(result.data?.data || []);
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
  }, [page, limit, search, status]);

  useEffect(() => {
    void loadBusinessTypes();
  }, [loadBusinessTypes]);

  const onSolvedHandler = () => {
    void loadBusinessTypes();
  };

  return (
    <div className="category-master-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>Support Tickets</h5>
            </div>

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
                      <div className="filter-select">
                        <label>Show :</label>
                        <select value={status} onChange={handleStatusChange}>
                          <option value="">All</option>
                          <option value="pending">Pending</option>
                          <option value="inprogress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
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
                        <th>Query ID</th>
                        <th>User name</th>
                        <th>Added on</th>
                        <th>Status</th>
                        <th>User comment</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {!loading ? (
                      <tbody>
                        {userQueryList.length > 0 ? (
                          userQueryList.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>
                                {item?.createdBy?.firstName || ''}{' '}
                                {item?.createdBy?.lastName || ''}
                              </td>
                              <td>
                                {format(
                                  new Date(item.createdAt),
                                  'dd MMM yyyy'
                                )}
                              </td>
                              <td>{item.status}</td>
                              <td>{item.title}</td>
                              <td>
                                <div className="action-btn-list">
                                  <button
                                    className="btn btn-primary text-nowrap "
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#admin_review_query"
                                    aria-controls="offcanvasRight"
                                    // disabled={item.status === 'completed'}
                                    onClick={() => {
                                      setSupportId(item?.id || '');
                                      setSupportStatus(item?.status || '');
                                    }}
                                  >
                                    Review Query
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
      <UserSupportComments
        supportId={supportId}
        onSolved={onSolvedHandler}
        supportStatus={supportStatus}
      />
    </div>
  );
};

export default UserSupportTickets;
