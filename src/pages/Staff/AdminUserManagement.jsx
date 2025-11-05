import React, { useEffect, useState, useCallback } from 'react';
import PaginationControls from '../../components/customTable/PaginationControls';
import usePagination from '../../hooks/usePagination';
import SearchInput from '../../components/customTable/SearchInput';
import EditIcon from '../../components/svgIcons/EditIcon';
import DeleteIcon from '../../components/svgIcons/DeleteIcon';
import { format } from 'date-fns';
import { fetchJamaat } from '../../services/jamaatService';
import { fetchJamiat } from '../../services/jamiatService';
import LoaderDots from '../../components/common/LoaderDots';
import {
  createUser,
  deleteUser,
  editUser,
  fetchUsers,
} from '../../services/UserService';
import CategoryForm from '../Categories/CategoryForm';
import AdminUserForm from './AdminUserForm';

const AdminUserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [jamaatList, setJamaatList] = useState([]);
  const [jamiatList, setJamiatList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
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

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchUsers(page, limit);
      setUserList(result.data?.data || []);
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
    void loadUsers();
  }, [loadUsers]);

  const handleSubmit = async (data) => {
    try {
      // Ensure jamaat_id and jamiat_id are numbers
      const formattedData = {
        ...data,
        jamaat_id: Number(data.jamaat_id),
        jamiat_id: Number(data.jamiat_id),
      };

      if (data.id) {
        const { id, its_id, password, ...dataWithoutId } = formattedData;
        await editUser(id, dataWithoutId);
      } else {
        await createUser(formattedData);
      }
    } catch (error) {
      console.error('Error submitting user:', error);
    } finally {
      await loadUsers();
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error('Error deleting jamaat:', error);
    } finally {
      void (await loadUsers());
    }
  };

  return (
    <div className="category-master-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>All Users</h5>
            </div>

            <AdminUserForm
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
                          data-bs-target="#add_staff"
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
                        <th>User name</th>
                        <th>Jamiat</th>
                        <th>Jamaat</th>
                        <th>Email ID</th>
                        <th>Mobile number</th>
                        <th>Added on</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {!loading ? (
                      <tbody>
                        {userList.length > 0 ? (
                          userList.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.firstName + ' ' + item.lastName}</td>
                              <td>
                                {item?.jamiat?.name || item?.jamiat_id || ''}
                              </td>
                              <td>
                                {item?.jamaat?.name || item?.jamaat_id || ''}
                              </td>
                              <td>{item?.email || ''}</td>
                              <td>{item?.phone || ''}</td>
                              <td>
                                {format(
                                  new Date(item.createdAt),
                                  'dd MMM yyyy'
                                )}
                              </td>
                              <td>{item?.role?.name || ''}</td>
                              <td>
                                {item?.role?.name !== 'SuperAdmin' && (
                                  <div className="action-btn-list">
                                    <button
                                      className="btn p-0"
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#add_staff"
                                      aria-controls="offcanvasRight"
                                      onClick={() => void setFormData(item)}
                                    >
                                      <EditIcon />
                                    </button>

                                    <button
                                      className="btn p-0"
                                      onClick={() => handleDeleteUser(item.id)}
                                    >
                                      <DeleteIcon />
                                    </button>
                                  </div>
                                )}
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

export default AdminUserManagement;
