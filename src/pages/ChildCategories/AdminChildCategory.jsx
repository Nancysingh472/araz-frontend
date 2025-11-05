import React, { useEffect, useState, useCallback } from 'react';
import PaginationControls from '../../components/customTable/PaginationControls';
import usePagination from '../../hooks/usePagination';
import SearchInput from '../../components/customTable/SearchInput';
import EditIcon from '../../components/svgIcons/EditIcon';
import DeleteIcon from '../../components/svgIcons/DeleteIcon';
import { format } from 'date-fns';
import { fetchSubCategories } from '../../services/subCategoryService';
import ChildCategoryForm from './ChildCategoryForm';
import {
  createChildCategory,
  deleteChildCategory,
  editChildCategory,
  fetchChildCategories,
} from '../../services/childCategoryService';
import LoaderDots from '../../components/common/LoaderDots';

const AdminChildCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState('All');

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  const loadSubCategories = useCallback(async () => {
    try {
      const result = await fetchSubCategories();
      setSubCategories(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, []);

  useEffect(() => {
    void loadSubCategories();
  }, [loadSubCategories]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    // setPage(0); // Reset page to 0 when status changes
  };

  const loadChildCategories = async () => {
    setLoading(true);
    try {
      let statusFilter = null;
      if (status === 'Active') {
        statusFilter = true;
      } else if (status === 'Inactive') {
        statusFilter = false;
      }
      const result = await fetchChildCategories(
        page,
        limit,
        search,
        statusFilter
      );
      setChildCategories(result.data?.data || []);
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
  };

  useEffect(() => {
    void loadChildCategories();
  }, [page, limit, search, status]);

  const handleSubmit = async (data) => {
    try {
      if (data.id) {
        const { id, ...dataWithoutId } = data;
        await editChildCategory(id, dataWithoutId);
      } else {
        await createChildCategory(data);
      }
    } catch (error) {
      console.error('Error submitting child category:', error);
    } finally {
      void (await loadChildCategories());
    }
  };

  const handleDeleteChildCategory = async (id) => {
    try {
      await deleteChildCategory(id);
    } catch (error) {
      console.error('Error deleting child category:', error);
    } finally {
      void (await loadChildCategories());
    }
  };

  return (
    <div className="category-master-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>Child Categories</h5>
            </div>

            <ChildCategoryForm
              handleSubmit={handleSubmit}
              initialData={formData}
              subCategories={subCategories}
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
                          data-bs-target="#add_child_category"
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
                        <th>Child Category ID</th>
                        <th>Child Category name</th>
                        <th>Sub Category name</th>
                        <th>Added on</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {!loading ? (
                      <tbody>
                        {childCategories.length > 0 ? (
                          childCategories.map((category) => (
                            <tr key={category.id}>
                              <td>{category.id}</td>
                              <td>{category.name}</td>
                              <td>{category?.subCategoryId?.name || ''}</td>
                              <td>
                                {format(
                                  new Date(category.createdAt),
                                  'dd MMM yyyy'
                                )}
                              </td>
                              <td>
                                <span
                                  className={
                                    category.enabled
                                      ? 'blue-status'
                                      : 'red-status'
                                  }
                                >
                                  {category.enabled ? 'Enabled' : 'Disabled'}
                                </span>
                              </td>
                              <td>
                                <div className="action-btn-list">
                                  <button
                                    className="btn p-0"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#add_child_category"
                                    aria-controls="offcanvasRight"
                                    onClick={() => void setFormData(category)}
                                  >
                                    <EditIcon />
                                  </button>

                                  <button
                                    className="btn p-0"
                                    onClick={() =>
                                      handleDeleteChildCategory(category.id)
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
                <div>
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
    </div>
  );
};

export default AdminChildCategory;
