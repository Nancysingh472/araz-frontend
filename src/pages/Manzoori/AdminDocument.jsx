import React, { useEffect, useState, useCallback } from 'react';
import usePagination from '../../hooks/usePagination';
import { Link } from 'react-router-dom';
import LoaderDots from '../../components/common/LoaderDots';
import { format } from 'date-fns';
import PaginationControls from '../../components/customTable/PaginationControls';
import DocumentForm from './DocumentForm';
import SearchInput from '../../components/customTable/SearchInput';
import { fetchSubCategories } from '../../services/subCategoryService';
import { fetchChildCategories } from '../../services/childCategoryService';
import { fetchCategories } from '../../services/categoryMasterService';
import {
  createDocument,
  deleteDocument,
  editDocument,
  fetchDocuments,
} from '../../services/documentService';
import EditIcon from '../../components/svgIcons/EditIcon';
import DeleteIcon from '../../components/svgIcons/DeleteIcon';

const AdminDocument = ({ onchangeType }) => {
  const [docList, setDocList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState('All');
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  const loadDocs = useCallback(async () => {
    setLoading(true);
    try {
      let statusFilter = null;
      if (status === 'Active') {
        statusFilter = true;
      } else if (status === 'Inactive') {
        statusFilter = false;
      }
      const result = await fetchDocuments(
        page,
        limit,
        search,
        statusFilter,
        'manzoori'
      );
      setDocList(result.data?.data || []);
      if (result.data && result.data?.count?.total) {
        const totalPages = Math.ceil(result.data?.count?.total / limit);
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

  const loadSubCategories = useCallback(async () => {
    try {
      const result = await fetchSubCategories(
        null,
        null,
        '',
        null,
        selectedCategory
      );
      setSubCategories(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [selectedCategory]);

  const loadChildCategories = useCallback(async () => {
    try {
      const result = await fetchChildCategories(
        null,
        null,
        '',
        null,
        selectedSubCategory
      );
      setChildCategories(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [selectedSubCategory]);

  const loadCategories = useCallback(async () => {
    try {
      const result = await fetchCategories();
      setCategories(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, []);

  useEffect(() => {
    void loadSubCategories();
    void loadChildCategories();
    void loadCategories();
  }, [loadSubCategories, loadCategories, loadChildCategories]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    // setPage(0); // Reset page to 0 when status changes
  };

  useEffect(() => {
    void loadDocs();
  }, [loadDocs]);

  const handleSubmit = async (data) => {
    try {
      if (data.id) {
        const { id, ...dataWithoutId } = data;
        await editDocument(id, dataWithoutId);
      } else {
        const response = await createDocument({ type: 'manzoori', ...data });
        if (response.data.id) {
          onchangeType('edit', response.data.id);
        }
      }
    } catch (error) {
      console.error('Error submitting jammat:', error);
    } finally {
      await loadDocs();
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await deleteDocument(id);
    } catch (error) {
      console.error('Error deleting form:', error);
    } finally {
      void (await loadDocs());
    }
  };

  return (
    <div className="form-master-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>Manzoori</h5>
            </div>
            <DocumentForm
              handleSubmit={handleSubmit}
              initialData={formData}
              categories={categories}
              childCategories={childCategories}
              subCategories={subCategories}
              setSelectedCategory={setSelectedCategory}
              setSelectedSubCategory={setSelectedSubCategory}
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
                          data-bs-target="#Add_New_Document"
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
                        <th>Document ID</th>
                        <th>Name</th>
                        <th>Added on</th>
                        <th>Status</th>
                        <th></th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {!loading ? (
                      <tbody>
                        {docList.length > 0 ? (
                          docList.map((item, index) => (
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
                                  {/*<Link*/}
                                  {/*  to={`/admin/EditDocument?documentId=${item.id}`}*/}
                                  {/*>*/}
                                  <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                      onchangeType('edit', item.id)
                                    }
                                  >
                                    View Document
                                  </button>
                                  {/*</Link>*/}
                                </div>
                              </td>
                              <td>
                                <div className="action-btn-list">
                                  {/*<button*/}
                                  {/*    className="btn p-0"*/}
                                  {/*    data-bs-toggle="offcanvas"*/}
                                  {/*    data-bs-target="#Add_New_Document"*/}
                                  {/*    aria-controls="offcanvasRight"*/}
                                  {/*    onClick={() => void setFormData(item)}*/}
                                  {/*>*/}
                                  {/*  <EditIcon />*/}
                                  {/*</button>*/}

                                  <button
                                    className="btn p-0"
                                    onClick={() =>
                                      handleDeleteDocument(item.id)
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

export default AdminDocument;
