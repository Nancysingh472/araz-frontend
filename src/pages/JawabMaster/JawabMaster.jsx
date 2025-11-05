import React, { useEffect, useState, useCallback } from 'react';
import PaginationControls from '../../components/customTable/PaginationControls';
import usePagination from '../../hooks/usePagination';
import SearchInput from '../../components/customTable/SearchInput';
import EditIcon from '../../components/svgIcons/EditIcon';
import DeleteIcon from '../../components/svgIcons/DeleteIcon';
import { format } from 'date-fns';
import JawabMasterForm from './JawabMasterForm';
import LoaderDots from '../../components/common/LoaderDots';
import {
  createJawabMaster,
  deleteJawabMaster,
  editJawabMaster,
  fetchJawabMaster,
} from '../../services/jawabMasterService';

const JawabMaster = () => {
  const [typeList, setTypeList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  const loadBusinessTypes = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchJawabMaster(page, limit, search);
      setTypeList(result.data?.data || []);
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
    void loadBusinessTypes();
  }, [loadBusinessTypes]);

  const handleSubmit = async (data) => {
    try {
      if (data.id) {
        const { id, ...dataWithoutId } = data;
        await editJawabMaster(id, dataWithoutId);
      } else {
        await createJawabMaster(data);
      }
    } catch (error) {
      console.error('Error submitting business type:', error);
    } finally {
      await loadBusinessTypes();
    }
  };

  const handleDeleteBusinessType = async (id) => {
    try {
      await deleteJawabMaster(id);
    } catch (error) {
      console.error('Error deleting business type:', error);
    } finally {
      void (await loadBusinessTypes());
    }
  };

  return (
    <div className="category-master-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>Jawab Master</h5>
            </div>

            <JawabMasterForm
              handleSubmit={handleSubmit}
              initialData={formData}
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
                      <div className="adduser-btn-div">
                        <button
                          className="btn"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#add_jawab_master"
                          aria-controls="offcanvasRight"
                          onClick={() => setFormData(null)}
                        >
                          + Add New
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
                        <th>type</th>
                        <th>Added on</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {!loading ? (
                      <tbody>
                        {typeList.length > 0 ? (
                          typeList.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.type}</td>
                              <td>
                                {format(
                                  new Date(item.createdAt),
                                  'dd MMM yyyy'
                                )}
                              </td>
                              <td>
                                <div className="action-btn-list">
                                  <button
                                    className="btn p-0"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#add_jawab_master"
                                    aria-controls="offcanvasRight"
                                    onClick={() => void setFormData(item)}
                                  >
                                    <EditIcon />
                                  </button>

                                  <button
                                    className="btn p-0"
                                    onClick={() =>
                                      handleDeleteBusinessType(item.id)
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

export default JawabMaster;
