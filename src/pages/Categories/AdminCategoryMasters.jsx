import React, { useEffect, useState, useCallback } from 'react';
import {
  createCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
} from '../../services/categoryMasterService';
import PaginationControls from '../../components/customTable/PaginationControls';
import usePagination from '../../hooks/usePagination';
import SearchInput from '../../components/customTable/SearchInput';
import EditIcon from '../../components/svgIcons/EditIcon';
import DeleteIcon from '../../components/svgIcons/DeleteIcon';
import { format } from 'date-fns';
import CategoryForm from './CategoryForm';
import { fetchJamaat } from '../../services/jamaatService';
import { fetchJamiat } from '../../services/jamiatService';
import LoaderDots from '../../components/common/LoaderDots';

const AdminCategoryMasters = () => {
  const [categories, setCategories] = useState([]);
  const [jamaatList, setJamaatList] = useState([]);
  const [jamiatList, setJamiatList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState('All');
  const [selectedJamiat, setSelectedJamiat] = useState(null);

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  const loadJamaat = useCallback(async () => {
    try {
      // if (!selectedJamiat) {
      //   setJamaatList([]);
      //   return;
      // }
      const result = await fetchJamaat(null, null, '', null, selectedJamiat);
      setJamaatList(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [selectedJamiat]);

  const loadJamiat = useCallback(async () => {
    try {
      const result = await fetchJamiat();
      setJamiatList(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, []);

  useEffect(() => {
    void loadJamiat();
  }, [loadJamiat]);

  useEffect(() => {
    void loadJamaat();
  }, [loadJamaat]);

  
  const handleStatusChange = (e) => {
  setStatus(e.target.value);
  handlePageChange(0);
};


  // const loadCategories = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     let statusFilter = null;
  //     if (status === 'Active') {
  //       statusFilter = true;
  //     } else if (status === 'Inactive') {
  //       statusFilter = false;
  //     }
  //     const result = await fetchCategories(page, limit, search, statusFilter);
  //     setCategories(result.data?.data || []);
  //     if (result.data && result.data.count) {
  //       const totalPages = Math.ceil(result.data.count / limit);
  //       setTotalPages(totalPages);
  //     } else {
  //       setTotalPages(0);
  //     }
  //   } catch (err) {
  //     console.error('Failed to load data', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [page, limit, search, status]);

 const loadCategories = useCallback(async () => {
  setLoading(true);
  try {
    let statusFilter = null;

    if (status === 'true') statusFilter = 1;
    if (status === 'false') statusFilter = 0;

    const result = await fetchCategories(page, limit, search, statusFilter);

    setCategories(result.data?.data || []);
    setTotalPages(
      result.data?.count ? Math.ceil(result.data.count / limit) : 0
    );
  } catch (err) {
    console.error('Failed to load data', err);
  } finally {
    setLoading(false);
  }
}, [page, limit, search, status]);


  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  const handleSubmit = async (categoryData) => {
    try {
      if (categoryData.id) {
        const { id, ...dataWithoutId } = categoryData;
        await editCategory(id, dataWithoutId);
      } else {
        await createCategory(categoryData);
      }
    } catch (error) {
      console.error('Error submitting category:', error);
    } finally {
      await loadCategories();
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      void (await loadCategories());
    }
  };

  return (
    <div className="category-master-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>Categories</h5>
            </div>

            <CategoryForm
              handleSubmit={handleSubmit}
              initialData={formData}
              jamaatList={jamaatList}
              jamiatList={jamiatList}
              setSelectedJamiat={setSelectedJamiat}
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
                          <option value="">All</option>
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>

                      </div>
                      <div className="adduser-btn-div">
                        <button
                          className="btn"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#Add_Category"
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
                        <th>Category ID</th>
                        <th>Category name</th>
                        {/* <th>Jamiat</th>
                        <th>Jamaat</th> */}
                        <th>Added on</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {!loading ? (
                      <tbody>
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <tr key={category.id}>
                              <td>{category.id}</td>
                              <td>{category.name}</td>
                              {/* <td>{category?.jamiat?.name || ''}</td>
                              <td>{category?.jamaat?.name || ''}</td> */}
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
                                    data-bs-target="#Add_Category"
                                    aria-controls="offcanvasRight"
                                    onClick={() => void setFormData(category)}
                                  >
                                    <EditIcon />
                                  </button>

                                  <button
                                    className="btn p-0"
                                    onClick={() =>
                                      handleDeleteCategory(category.id)
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

export default AdminCategoryMasters;
