import React, { useEffect, useState, useCallback } from 'react';
import PaginationControls from '../../components/customTable/PaginationControls';
import usePagination from '../../hooks/usePagination';
import SearchInput from '../../components/customTable/SearchInput';
import EditIcon from '../../components/svgIcons/EditIcon';
import DeleteIcon from '../../components/svgIcons/DeleteIcon';
import { format } from 'date-fns';
import JammatForm from './JammatForm';
import {
  createJamaat,
  deleteJamaat,
  editJamaat,
  fetchJamaat,
} from '../../services/jamaatService';
import { fetchJamiat } from '../../services/jamiatService';
import LoaderDots from '../../components/common/LoaderDots';

const Jammat = () => {
  const [jamaatList, setJamaatList] = useState([]);
  const [jamiatList, setJamiatList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState('All');

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    // setPage(0); // Reset page to 0 when status changes
  };

  const loadJamiat = useCallback(async () => {
    try {
      const result = await fetchJamiat();
      setJamiatList(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, []);

  const loadJamaat = useCallback(async () => {
    setLoading(true);
    try {
      let statusFilter = null;
      if (status === 'Active') {
        statusFilter = true;
      } else if (status === 'Inactive') {
        statusFilter = false;
      }
      const result = await fetchJamaat(page, limit, search, statusFilter);
      setJamaatList(result.data?.data || []);
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
    void loadJamaat();
    void loadJamiat();
  }, [loadJamaat, loadJamiat]);

  const handleSubmit = async (data) => {
    try {
      if (data.id) {
        const { id, ...dataWithoutId } = data;
        await editJamaat(id, dataWithoutId);
      } else {
        await createJamaat(data);
      }
    } catch (error) {
      console.error('Error submitting jammat:', error);
    } finally {
      await loadJamaat();
    }
  };

  const handleDeleteJamaat = async (id) => {
    try {
      await deleteJamaat(id);
    } catch (error) {
      console.error('Error deleting jamaat:', error);
    } finally {
      void (await loadJamaat());
    }
  };

  return (
    <div className="category-master-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>Jamaats</h5>
            </div>

            <JammatForm
              handleSubmit={handleSubmit}
              initialData={formData}
              jamiatList={jamiatList}
            />

            <div className="request-table">
              <div className="rt-head">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <div className="table-search mb-0">
                      <SearchInput onSearch={setSearch} delay={500} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="table-top-right-btn-list mt-sm-0">
                      <div className="filter-select">
                        <label>Show :</label>
                        <select value={status} onChange={handleStatusChange}>
                          <option value="All">All</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <div className="adduser-btn-div">
                        <button
                          className="btn"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#add_jamaat"
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
                        <th>ID</th>
                        <th>Jammat Name</th>
                        <th>Jamiat Name</th>
                        <th>Added on</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {!loading ? (
                      <tbody>
                        {jamaatList.length > 0 ? (
                          jamaatList.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item?.jamiat?.name || ''}</td>
                              <td>
                                {format(
                                  new Date(item.createdAt),
                                  'dd MMM yyyy'
                                )}
                              </td>
                              <td>
                                <span
                                  className={
                                    item.enabled ? 'blue-status' : 'red-status'
                                  }
                                >
                                  {item.enabled ? 'Enabled' : 'Disabled'}
                                </span>
                              </td>
                              <td>
                                <div className="action-btn-list">
                                  <button
                                    className="btn p-0"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#add_jamaat"
                                    aria-controls="offcanvasRight"
                                    onClick={() => void setFormData(item)}
                                  >
                                    <EditIcon />
                                  </button>

                                  <button
                                    className="btn p-0"
                                    onClick={() => handleDeleteJamaat(item.id)}
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

export default Jammat;
