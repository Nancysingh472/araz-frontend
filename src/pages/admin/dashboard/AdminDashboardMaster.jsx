import React, { useState, useEffect, useCallback } from 'react';
import AdminDashboard from './AdminDashboard';
import AdminUploadBulkJawab from './AdminUploadBulkJawab';
import AdminApproveBulkJawab from './AdminApproveBulkJawab';
import { fetchJawabMaster } from '../../../services/jawabMasterService';

const AdminDashboardMaster = () => {
  const [step, setStep] = useState('dashboard');
  const [reqJawabList, setReqJawabList] = useState([]); //ans jawab
  const [reqApproveList, setReqApproveList] = useState([]); //ans jawab
  const [jawabAnswerData, setJwabAnswerData] = useState([]);
  const [jawabServiceData, setaJwabServiceData] = useState([]);

  const loadAnswerJawabs = useCallback(async () => {
    try {
      const result = await fetchJawabMaster(null, null, '', 'answer');
      setJwabAnswerData(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, []);

  const loadServiceJawabs = useCallback(async () => {
    try {
      const result = await fetchJawabMaster(null, null, '', 'service');
      setaJwabServiceData(result.data?.data || []);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, []);

  useEffect(() => {
    void loadAnswerJawabs();
    void loadServiceJawabs();
  }, [loadAnswerJawabs, loadServiceJawabs]);

  return (
    <>
      {step === 'dashboard' && (
        <AdminDashboard
          setStep={setStep}
          setReqJawabList={setReqJawabList}
          setReqApproveList={setReqApproveList}
          jawabAnswerData={jawabAnswerData}
          jawabServiceData={jawabServiceData}
        />
      )}
      {step === 'bulkJawab' && (
        <AdminUploadBulkJawab
          setStep={setStep}
          reqJawabList={reqJawabList}
          jawabAnswerData={jawabAnswerData}
          jawabServiceData={jawabServiceData}
        />
      )}
      {step === 'bulkApprove' && (
        <AdminApproveBulkJawab
          setStep={setStep}
          reqJawabList={reqApproveList}
          jawabAnswerData={jawabAnswerData}
          jawabServiceData={jawabServiceData}
        />
      )}
    </>
  );
};

export default AdminDashboardMaster;
