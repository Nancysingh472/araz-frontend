import React, { useEffect, useState, useCallback } from 'react';
import DashboardIcon1 from '../../../components/svgIcons/DashboardIcon1';
import DashboardIcon2 from '../../../components/svgIcons/DashboardIcon2';
import DashboardIcon3 from '../../../components/svgIcons/DashboardIcon3';
import DashboardIcon4 from '../../../components/svgIcons/DashboardIcon4';
import DashboardIcon5 from '../../../components/svgIcons/DashboardIcon5';
import DashboardIcon6 from '../../../components/svgIcons/DashboardIcon6';
import { getRazaReport } from '../../../services/arazService';

const DashboardCards = ({ filters }) => {
  const [reportData, setReportData] = useState({});

  const loadReport = useCallback(async () => {
    try {
      const result = await getRazaReport({
        fromDate: filters?.fromDate,
        toDate: filters?.toDate,
      });
      setReportData(result.data || {});
      console.log(result);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [
    filters?.fromDate,
    filters?.toDate,
  ]);

  useEffect(() => {
    loadReport();
  }, [loadReport]);

  return (
    <div className="dashboard-card-list mb-3">
      <div className="row">
        <div className="col-sm-6 col-md-6 col-lg-4">
          <div className="dashboard-card bg-white mb-4">
            <div className="dc-head">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <div className="card-title">
                    <p>New requests </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-icon">
                    <DashboardIcon1 />
                  </div>
                </div>
              </div>
            </div>
            <div className="dc-bottom">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <button className="btn p-0 view-req-btn">
                    View requests >
                  </button>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-count">
                    <h1>{reportData?.newRazaRequestCount || 0}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-4">
          <div className="dashboard-card bg-white mb-4">
            <div className="dc-head">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <div className="card-title">
                    <p>Incomplete requests </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-icon">
                    <DashboardIcon2 />
                  </div>
                </div>
              </div>
            </div>
            <div className="dc-bottom">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <button className="btn p-0 view-req-btn">
                    View requests >
                  </button>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-count">
                    <h1>{reportData?.inProgressRazaRequestCount || 0}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-4">
          <div className="dashboard-card bg-white mb-4">
            <div className="dc-head">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <div className="card-title">
                    <p>Approved requests </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-icon">
                    <DashboardIcon3 />
                  </div>
                </div>
              </div>
            </div>
            <div className="dc-bottom">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <button className="btn p-0 view-req-btn">
                    View requests >
                  </button>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-count">
                    <h1>0</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4">
          <div className="dashboard-card bg-white mb-4">
            <div className="dc-head">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <div className="card-title">
                    <p>Rejected requests</p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-icon">
                    <DashboardIcon4 />
                  </div>
                </div>
              </div>
            </div>
            <div className="dc-bottom">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <button className="btn p-0 view-req-btn">
                    View requests >
                  </button>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-count">
                    <h1>{reportData?.rejectedRazaRequestCount || 0}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-4">
          <div className="dashboard-card bg-white mb-4">
            <div className="dc-head">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <div className="card-title">
                    <p>Istershaad / Manzoori</p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-icon">
                    <DashboardIcon5 />
                  </div>
                </div>
              </div>
            </div>
            <div className="dc-bottom">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <button className="btn p-0 view-req-btn">
                    View requests >
                  </button>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-count">
                    <h1>0</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-4">
          <div className="dashboard-card bg-white mb-4">
            <div className="dc-head">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <div className="card-title">
                    <p>Completed requests</p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-icon">
                    <DashboardIcon6 />
                  </div>
                </div>
              </div>
            </div>
            <div className="dc-bottom">
              <div className="row align-items-center justify-content-between">
                <div className="col-8">
                  <button className="btn p-0 view-req-btn">
                    View requests >
                  </button>
                </div>
                <div className="col-4 text-end">
                  <div className="dc-count">
                    <h1>{reportData?.completedRazaRequestCount || 0}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
