import React, { useEffect, useState, useCallback } from 'react';
import usePagination from '../../../hooks/usePagination';
import { deleteRequest, fetchRequests } from '../../../services/arazService';
import SearchInput from '../../../components/customTable/SearchInput';
import LoaderDots from '../../../components/common/LoaderDots';
import PaginationControls from '../../../components/customTable/PaginationControls';
import { format } from 'date-fns';
import UserDashboardSlider from './UserDashboardSlider';
import DeleteIcon from '../../../components/svgIcons/DeleteIcon';
import DownloadJawabModel from './DownloadJawabModel';

const UserRequestTable = () => {
  const [reqList, setReqList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [arazData, setArazData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('');

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  const loadRequest = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchRequests(page, limit, search, status);
      let finalResult = [];
      if (result.data?.data && result.data?.data.length > 0) {
        finalResult = result.data.data.filter(
          (item) => item.status !== 'draft'
        );
      }
      setReqList(finalResult);
      setArazData(finalResult.length > 0 ? finalResult[0] : null);
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
    void loadRequest();
  }, [loadRequest]);

  const handleDeleteRequest = async (id) => {
    try {
      await deleteRequest(id);
    } catch (error) {
      console.error('Error deleting request:', error);
    } finally {
      void (await loadRequest());
    }
  };
  return (
    <div>
      <DownloadJawabModel requestId={selectedId} />
      <UserDashboardSlider arazData={arazData} />

      {/*
        <div className="request-table-div">
          <div className="title-div mb-4">
            <h5>All requests</h5>
          </div>
          <div className="request-table">
            <div className="rt-head">
              <div className="row">
                <div className="col-sm-4">
                  <div className="table-search">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                    />
                    <button className="btn search-btn">
                      <img
                        src="/assets/images/search-icon.svg"
                        alt="icon"
                        className="img-fluid"
                      />
                    </button>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="table-action-btn-list">
                    <input className="form-control" type="date" />
                    <select className="form-control">
                      <option>Category</option>
                    </select>
                    <select className="form-control">
                      <option>Sub-category</option>
                    </select>
                    <select className="form-control">
                      <option>Status</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="rt-body">
              <div className="table-responsive">
                <table className="table table-striped custom-table">
                  <thead>
                    <tr>
                      <th width="6%">Request ID</th>
                      <th>Business name</th>
                      <th>Jamiat</th>
                      <th>Jamaat</th>
                      <th>Added on</th>
                      <th>Araz type</th>
                      <th>Status</th>
                      <th>Latest comments</th>
                      <th width="12%"></th>
                      <th width="3%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>00128</td>
                      <td>Mohammedi Hardware</td>
                      <td>Surat</td>
                      <td>Surat</td>
                      <td>04 Aug 2023</td>
                      <td>Dua araz</td>
                      <td>
                        <span className="text-primary">Jawab received</span>
                      </td>
                      <td>-</td>
                      <td>
                        <div className="dj-btn">
                          <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#Download_Jawab_Modal"
                          >
                            Download Jawab
                          </button>
                        </div>
                      </td>
                      <td>
                        <button className="btn dlt-btn p-0">
                          <img
                            src="/assets/images/delete-icon.svg"
                            alt="delete"
                            className="img-fluid"
                          />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>00128</td>
                      <td>Mohammedi Hardware</td>
                      <td>Surat</td>
                      <td>Surat</td>
                      <td>04 Aug 2023</td>
                      <td>Dua araz</td>
                      <td>
                        <span className="review-status">Request in review</span>
                      </td>
                      <td>-</td>
                      <td>
                        <div className="dj-btn">
                          <button className="btn btn-primary">
                            Download Jawab
                          </button>
                        </div>
                      </td>
                      <td>
                        <button className="btn dlt-btn p-0">
                          <img
                            src="/assets/images/delete-icon.svg"
                            alt="delete"
                            className="img-fluid"
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
*/}
      <div className="title-div mb-4">
        <h5>All requests</h5>
      </div>
      <div className="request-table">
        <div className="rt-head">
          <div className="row align-items-center">
            <div className="col-sm-4">
              <div className="table-search mb-0">
                <SearchInput onSearch={setSearch} delay={500} />
              </div>
            </div>
            <div className="col-md-8">
              <div className="table-top-right-btn-list">
                <div className="filter-select">
                  <label>Show :</label>
                  <select
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={''}>All</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
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
                  <th>ID</th>
                  <th>Name</th>
                  <th>Added on</th>
                  <th>Jamaat</th>
                  <th>Jamiat</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {!loading ? (
                <tbody>
                  {reqList.length > 0 ? (
                    reqList.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item?.formId?.name || ''}</td>
                        <td>
                          {format(new Date(item.createdAt), 'dd MMM yyyy')}
                        </td>
                        <td>{item?.categoryId?.jamaat?.name || ''}</td>
                        <td>{item?.categoryId?.jamiat?.name || ''}</td>
                        <td
                          className={
                            item?.status === 'rejected' ? 'text-danger' : ''
                          }
                        >
                          {item?.status?.toUpperCase()}
                        </td>{' '}
                        <td>
                          {item.status === 'completed' ? (
                            <div className="dj-btn">
                              <button
                                onClick={() => setSelectedId(item.id)}
                                className="btn btn-primary"
                                disabled={
                                  item.status !== 'completed' ||
                                  !item.jawab_additional
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#Download_Jawab_Modal"
                              >
                                {item.jawab_additional
                                  ? 'View Jawab'
                                  : 'Jawab Pending'}
                              </button>
                            </div>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn p-0"
                            onClick={() => handleDeleteRequest(item.id)}
                          >
                            <DeleteIcon />
                          </button>
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
  );
};

export default UserRequestTable;
