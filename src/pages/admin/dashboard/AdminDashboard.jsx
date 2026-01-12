import { useCallback, useEffect, useState } from 'react';
import AdminSideRequestTable from './AdminSideRequestTable';
import DashboardCards from './DashboardCards';
import { fetchJamiatList } from '../../../services/jamiatService';
import { fetchJamaat } from '../../../services/jamaatService';

const AdminDashboard = ({
  setStep,
  setReqJawabList,
  setReqApproveList,
  jawabServiceData,
  jawabAnswerData,
}) => {
  const [jamiatData,setJamiatData] = useState([]);
  const [jamatData,setJamatData] = useState([]);
  const [filters, setFilters] = useState({
  fromDate: '',
  toDate: '',
  jamiatId: '',
  jamaatId: '',
});
  const handleFilterChange = (e) => {
  const { name, value } = e.target;

  setFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const fetchJamiatData = useCallback(async() => {
    try {
      const result = await fetchJamiatList();
      setJamiatData(result.data.data);
    } catch (error) {
      
    }
  },[]);
  const fetchJamatData = useCallback(async() => {
    try {
      const result = await fetchJamaat();
      setJamatData(result.data.data);
    } catch (error) {
      
    }
  },[]);

  useEffect(() => {
    fetchJamiatData();
    fetchJamatData();
  }, [fetchJamiatData,fetchJamatData]);
  return (
    <div className="dashboard-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <h5>Dashboard</h5>
                </div>
                <div className="col-md-8">
                  <div className="table-filter-div">
                    <div className="custom-input-group">
                      <label>From </label>
                      <input
                        className="tb-custom-control"
                        type="date"
                        name="fromDate"
                        value={filters.fromDate}
                        onChange={handleFilterChange}
                      />

                    </div>
                    <div className="custom-input-group">
                      <label>To </label>
                      <input
                        className="tb-custom-control"
                        type="date"
                        name="toDate"
                        value={filters.toDate}
                        onChange={handleFilterChange}
                      />
                    </div>
                    <div className="custom-input-group">
                      <label>Jamiat</label>
                      <select
  className="tb-custom-control"
  name="jamiatId"
  value={filters.jamiatId}
  onChange={handleFilterChange}
>
  <option value="">All Jamiat</option>
  {jamiatData.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))}
</select>

                    </div>
                    <div className="custom-input-group">
                      <label>Jamaat</label>
                      <select
  className="tb-custom-control"
  name="jamaatId"
  value={filters.jamaatId}
  onChange={handleFilterChange}
>
  <option value="">All Jamaat</option>
  {jamatData.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))}
</select>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DashboardCards filters={filters}/>
            <AdminSideRequestTable
              setStep={setStep}
              setReqJawabList={setReqJawabList}
              setReqApproveList={setReqApproveList}
              jawabAnswerData={jawabAnswerData}
              jawabServiceData={jawabServiceData}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
