import React, { useEffect, useState, useCallback } from 'react';
import SearchInput from '../../../components/customTable/SearchInput';
import LoaderDots from '../../../components/common/LoaderDots';
import PaginationControls from '../../../components/customTable/PaginationControls';
import usePagination from '../../../hooks/usePagination';
import { deleteRequest, fetchRequests } from '../../../services/arazService';
import { format } from 'date-fns';
import DeleteIcon from '../../../components/svgIcons/DeleteIcon';

const UserDraft = () => {
  const [reqList, setReqList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  const loadDraftRequest = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchRequests(page, limit, search, 'draft');
      setReqList(result.data?.data || []);
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
    void loadDraftRequest();
  }, [loadDraftRequest]);

  const handleDeleteRequest = async (id) => {
    try {
      await deleteRequest(id);
    } catch (error) {
      console.error('Error deleting request:', error);
    } finally {
      void (await loadDraftRequest());
    }
  };
  return (
    <div className="userdrafgt-content-div px-20">
      <div className="title-div mb-4">
        <h5>All requests</h5>
      </div>
      <div className="request-table">
        <div className="rt-head">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="table-search mb-0">
                <SearchInput onSearch={setSearch} delay={500} />
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
                  {/*<th></th>*/}
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
                        <td>{item.status}</td>
                        {/*<td>*/}
                        {/*  <div className="dj-btn">*/}
                        {/*    <button*/}
                        {/*        className="btn btn-primary"*/}
                        {/*        disabled={item.status !== 'completed'}*/}
                        {/*    >*/}
                        {/*      Download Jawab*/}
                        {/*    </button>*/}
                        {/*  </div>*/}
                        {/*</td>*/}
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

export default UserDraft;
