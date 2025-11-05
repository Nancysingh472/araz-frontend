import React from 'react';
import AdminSideRequestTable from './AdminSideRequestTable';
import DashboardCards from './DashboardCards';

const AdminDashboard = ({
  setStep,
  setReqJawabList,
  setReqApproveList,
  jawabServiceData,
  jawabAnswerData,
}) => {
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
                      <label>Added on</label>
                      <input className="tb-custom-control" type="date" />
                    </div>
                    <div className="custom-input-group">
                      <label>Jamiat</label>
                      <select className="tb-custom-control">
                        <option>Hyderabad</option>
                      </select>
                    </div>
                    <div className="custom-input-group">
                      <label>Jamaat</label>
                      <select className="tb-custom-control">
                        <option>Ezzy</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DashboardCards />
            <AdminSideRequestTable
              setStep={setStep}
              setReqJawabList={setReqJawabList}
              setReqApproveList={setReqApproveList}
              jawabAnswerData={jawabAnswerData}
              jawabServiceData={jawabServiceData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
