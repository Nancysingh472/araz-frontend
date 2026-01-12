import React, { useEffect, useState, useCallback } from 'react';
import PaginationControls from '../../components/customTable/PaginationControls';
import usePagination from '../../hooks/usePagination';
import SearchInput from '../../components/customTable/SearchInput';
import EditIcon from '../../components/svgIcons/EditIcon';
import DeleteIcon from '../../components/svgIcons/DeleteIcon';
import { format } from 'date-fns';
import JamiatForm from './JamiatForm';
import {
  createBulkJamiat,
  createJamiat,
  deleteJamiat,
  editJamiat,
  fetchJamiat,
} from '../../services/jamiatService';
import LoaderDots from '../../components/common/LoaderDots';
import BulkForm from './BulkForm';
import axios from 'axios';

const Jamiat = () => {
  const [JamiatList, setJamiatList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [formBulkData, setFormBulkData] = useState(null);

  const [status, setStatus] = useState('All');

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    // setPage(0); // Reset page to 0 when status changes
  };

  const loadJamiat = useCallback(async () => {
    setLoading(true);
    try {
      let statusFilter = null;
      if (status === 'Active') {
        statusFilter = true;
      } else if (status === 'Inactive') {
        statusFilter = false;
      }
      const result = await fetchJamiat(page, limit, search, statusFilter);
      setJamiatList(result.data?.data || []);
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
    void loadJamiat();
  }, [loadJamiat]);

  const handleSubmit = async (data) => {
    try {
      if (data.id) {
        const { id, ...dataWithoutId } = data;
        await editJamiat(id, dataWithoutId);
      } else {
        await createJamiat(data);
      }
    } catch (error) {
      console.error('Error submitting jammat:', error);
    } finally {
      await loadJamiat();
    }
  };
 const handleBulkSubmit = async (formData) => {
  try {
    const res = await createBulkJamiat(formData);
    await loadJamiat();
    console.log('Bulk upload success', res);
    alert('Bulk upload successful!'); // ✅ optional
  } catch (err) {
    console.error(err);
    alert('Bulk upload failed!'); // ✅ optional
  }
};





  const handleDeleteJamiat = async (id) => {
    try {
      await deleteJamiat(id);
    } catch (error) {
      console.error('Error deleting jamiat:', error);
    } finally {
      void (await loadJamiat());
    }
  };

  return (
    <div className="category-master-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>Jamiats</h5>
            </div>

            <JamiatForm handleSubmit={handleSubmit} initialData={formData} />
            {/* <BulkForm handleSubmit={handleBulkSubmit}/> */}
             <BulkForm handleBulkSubmit={(data) => handleBulkSubmit(data)} />

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
                          data-bs-target="#add_jamiat"
                          aria-controls="offcanvasRight"
                          onClick={() => setFormData(null)}
                        >
                          + Add new
                        </button>
                        </div>
                        <div className="adduser-btn-div">
                         <button
                          className="btn"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#bulkadd_jamiat"
                          aria-controls="offcanvasRight"
                          onClick={() => setFormBulkData(null)}
                        >
                          Bulk Upload
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
                        <th>name</th>
                        <th>Added on</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {!loading ? (
                      <tbody>
                        {JamiatList.length > 0 ? (
                          JamiatList.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
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
                                    data-bs-target="#add_jamiat"
                                    aria-controls="offcanvasRight"
                                    onClick={() => void setFormData(item)}
                                  >
                                    <EditIcon />
                                  </button>

                                  <button
                                    className="btn p-0"
                                    onClick={() => handleDeleteJamiat(item.id)}
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

export default Jamiat;
