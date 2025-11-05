import React, { useEffect, useState, useCallback } from 'react';
import usePagination from '../../../hooks/usePagination';
import { bulkPreviewDocApi, deleteRequest, fetchRequests } from '../../../services/arazService';
import SearchInput from '../../../components/customTable/SearchInput';
import LoaderDots from '../../../components/common/LoaderDots';
import PaginationControls from '../../../components/customTable/PaginationControls';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../../components/svgIcons/DeleteIcon';
import RazaJawabForm from './RazaJawabrForm';
import { toast } from 'react-toastify';
import { addRazaJawab } from '../../../services/razaJawabService';
import DownloadIcon from '../../../components/svgIcons/DownloadIcon';
import {
  getDocumentByCategories,
  getDocumentPreview,
} from '../../../services/documentService';
import RoundSpinner from '../../../components/common/RoundSpinner';

const AdminSideRequestTable = ({
  setStep,
  setReqJawabList,
  jawabServiceData,
  setReqApproveList,
  jawabAnswerData,
}) => {
  const [reqList, setReqList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [currentSelectedId, setCurrentSelectedId] = useState(null);
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedReviewReq, setSelectedReviewReq] = useState([]);

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRows.length > 0) {
      // Filter reqList to include only objects with IDs in selectedRows
      const selectedObjects = reqList.filter((item) =>
        selectedRows.includes(item.id)
      );
      setReqJawabList(selectedObjects);
    }
  }, [selectedRows, reqList]);

  useEffect(() => {
    if (selectedReviewReq.length > 0) {
      // Filter reqList to include only objects with IDs in selectedRows
      const selectedObjects = reqList.filter((item) =>
        selectedReviewReq.includes(item.id)
      );
      setReqApproveList(selectedObjects);
    }
  }, [selectedReviewReq, reqList]);

  const handleRowSelect = (item) => {
    if (item.status === 'pending') {
      setSelectedReviewReq(
        (prev) =>
          prev.includes(item.id)
            ? prev.filter((rowId) => rowId !== item.id) // Deselect
            : [...prev, item.id] // Select
      );
      return;
    }
    setSelectedRows(
      (prevSelectedRows) =>
        prevSelectedRows.includes(item.id)
          ? prevSelectedRows.filter((rowId) => rowId !== item.id) // Deselect
          : [...prevSelectedRows, item.id] // Select
    );
  };

  const loadRequest = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchRequests(page, limit, search, status);
      setReqList(result.data?.data || []);
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
    void loadRequest();
  }, [loadRequest]);

  const handleDeleteRequest = async (id) => {
    try {
      await deleteRequest(id);
    } catch (error) {
      console.error('Error deleting request:', error);
    } finally {
      void (await loadRequest());
    }
  };

  const buildBulkPreview = async (bulkId) => {
    try {
      let result = await bulkPreviewDocApi([bulkId], {
        isBulk: true,
        pdf: true,
      });
      const pdfBlob = new Blob(
        [Uint8Array.from(atob(result?.data), (c) => c.charCodeAt(0))],
        { type: 'application/pdf' }
      );
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } catch (error) {
      console.error('Error submitting business type:', error);
    }
  };

  const handlePrint = async (docId) => {
    try {
      const result = await getDocumentPreview(docId, false);
      const pdfBlob = new Blob(
        [Uint8Array.from(atob(result?.data), (c) => c.charCodeAt(0))],
        { type: 'application/pdf' }
      );
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } catch (e) {
      console.error('Error generating PDF:', e);
    }
  };

  const fetchAndPrintDocument = async (
    categoryId,
    subCategoryId,
    childCategoryId,
    type
  ) => {
    try {
      const result = await getDocumentByCategories(
        categoryId,
        subCategoryId,
        childCategoryId,
        type
      );
      if (result?.data?.id) {
        await handlePrint(result.data.id);
      } else {
        console.warn(`No document found for type: ${type}`);
      }
    } catch (error) {
      console.error(`Error fetching document of type ${type}:`, error);
    }
  };

  const handlePdfDownload = async (requestId) => {
    try {
      setCurrentSelectedId(requestId);
      setLoadingPdf(true);

      const requestData = reqList.find((item) => item.id === requestId);
      if (
        !requestData ||
        !requestData?.category_id ||
        !requestData?.sub_category_id ||
        !requestData?.child_category_id
      ) {
        console.error('Invalid request data.');
        setLoadingPdf(false);
        return;
      }

      // Define the document types
      let documentTypes = ['form', 'manzoori', 'istershaad'];

      if (requestData.bulk_group) {
        await buildBulkPreview(requestData.bulk_group);
        return;
      }

      // Fetch and print documents concurrently
      await Promise.all(
        documentTypes.map((type) =>
          fetchAndPrintDocument(
            requestData.category_id,
            requestData.sub_category_id,
            requestData.child_category_id,
            type
          )
        )
      );

      setLoadingPdf(false);
    } catch (error) {
      setLoadingPdf(false);
      console.error('Error during PDF download process:', error);
    }
  };

  const uploadJawab = async (data) => {
    // Convert string arrays to integer arrays
    const preparedData = {
      ...data,
      jawab_answers: data.jawab_answers.map(Number),
      jawab_recommanded_service: data.jawab_recommanded_service.map(Number),
      raza_ids: data.raza_ids.map(Number),
    };

    try {
      await addRazaJawab(preparedData);
      toast.success('Jawab sent successfully.');
    } catch (error) {
      console.error('Error submitting business type:', error);
    }
  };

  return (
    <div>
      <RazaJawabForm
        handleSubmit={uploadJawab}
        idList={formData?.id ? [formData?.id?.toString()] : []}
        jawabServiceData={jawabServiceData}
        jawabAnswerData={jawabAnswerData}
      />
      <div className="title-div mb-4">
        <h5>All Requests</h5>
      </div>
      <div className="request-table">
        <div className="rt-head">
          <div className="row align-items-center">
            <div className="col-sm-4">
              <div className="table-search mb-0">
                <SearchInput onSearch={setSearch} delay={500} />
              </div>
            </div>
            <div className="col-md-8">
              <div className="table-top-right-btn-list">
                <div className="filter-select">
                  <label>Show :</label>
                  <select
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={''}>All</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                {/*<div className="import-btn-div">*/}
                {/*  <input id="file-import" type="file" />*/}
                {/*  <label htmlFor="file-import">Import</label>*/}
                {/*</div>*/}
                {/*<div className="import-btn-div">*/}
                {/*  <input id="file-export" type="file" />*/}
                {/*  <label htmlFor="file-export">Export</label>*/}
                {/*</div>*/}
                <div className="import-btn-div d-flex gap-3">
                  <button
                    disabled={selectedRows.length <= 1}
                    className="btn btn-primary2 h-100"
                    onClick={() => {
                      setStep('bulkJawab');
                    }}
                  >
                    Upload bulk jawab
                  </button>
                  <button
                    disabled={selectedReviewReq.length <= 1}
                    className="btn btn-primary2 h-100"
                    onClick={() => {
                      setStep('bulkApprove');
                    }}
                  >
                    Submit bulk Request
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
                  <th>
                    <div className="custom-check">
                      <input type="checkbox" />
                      <label></label>
                    </div>
                  </th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Added on</th>
                  <th>Jamaat</th>
                  <th>Jamiat</th>
                  <th>Group Id</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                  {/*<th></th>*/}
                </tr>
              </thead>
              {!loading ? (
                <tbody>
                  {reqList.length > 0 ? (
                    reqList.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {
                          !item.jawab_additional ? (
                            <div className="custom-check">
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(item.id) || selectedReviewReq.includes(item.id)} // Check if the row is selected
                                onChange={() => handleRowSelect(item)} // Handle row selection
                              />
                              <label></label>
                            </div>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td>{item.id}</td>
                        <td>{item?.formId?.name || ''}</td>
                        <td>
                          {format(new Date(item.createdAt), 'dd MMM yyyy')}
                        </td>
                        <td>{item?.categoryId?.jamaat?.name || ''}</td>
                        <td>{item?.categoryId?.jamiat?.name || ''}</td>
                        <td>
                          {item?.bulk_group || '-'}
                        </td>
                        <td
                          className={
                            item?.status === 'rejected' ? 'text-danger' : ''
                          }
                        >
                          {item?.status}
                        </td>
                        <td>
                          <div className="action-btn-list">
                            {item?.status === 'rejected' && (
                              <button
                                className="btn btn-primary text-nowrap "
                                disabled={true}
                              >
                                Request Closed
                              </button>
                            )}

                            {(item?.status === 'pending' || item?.status === 'generated') && (
                              <button
                                className="btn btn-primary text-nowrap"
                                onClick={() => {
                                  navigate(`/admin/request-review/${item.id}`);
                                }}
                              >
                                Review Request
                              </button>
                            )}

                            {item?.status === 'completed' && (
                              <button
                                className="btn btn-primary text-nowrap "
                                data-bs-toggle="offcanvas"
                                data-bs-target="#add_raza_jawab"
                                aria-controls="offcanvasRight"
                                onClick={() => void setFormData(item)}
                                disabled={item.jawab_additional}
                              >
                                {item.jawab_additional
                                  ? 'Jawab uploaded'
                                  : 'Upload Jawab'}
                              </button>
                            )}

                            {/*{item?.status === "completed" && (*/}
                            {/*<button*/}
                            {/*    className="btn btn-primary text-nowrap"*/}
                            {/*>*/}
                            {/*  Download*/}
                            {/*</button>)}*/}
                            {/*<button className="btn btn-primary2 circle-btn">*/}
                            {/*  <svg*/}
                            {/*    width="18"*/}
                            {/*    height="18"*/}
                            {/*    viewBox="0 0 18 18"*/}
                            {/*    fill="none"*/}
                            {/*    xmlns="http://www.w3.org/2000/svg"*/}
                            {/*  >*/}
                            {/*    <path*/}
                            {/*      d="M9 13.599L4.44986 9.05014L5.36014 8.12443L8.35714 11.1214V0H9.64286V11.1214L12.6386 8.12571L13.5501 9.05014L9 13.599ZM2.07771 18C1.48543 18 0.991285 17.802 0.595285 17.406C0.199285 17.01 0.000857143 16.5154 0 15.9223V12.807H1.28571V15.9223C1.28571 16.1203 1.368 16.302 1.53257 16.4674C1.69714 16.6329 1.87843 16.7151 2.07643 16.7143H15.9236C16.1207 16.7143 16.302 16.632 16.4674 16.4674C16.6329 16.3029 16.7151 16.1211 16.7143 15.9223V12.807H18V15.9223C18 16.5146 17.802 17.0087 17.406 17.4047C17.01 17.8007 16.5154 17.9991 15.9223 18H2.07771Z"*/}
                            {/*      fill="white"*/}
                            {/*    />*/}
                            {/*  </svg>*/}
                            {/*</button>*/}
                            {/*<button*/}
                            {/*  className="btn btn-primary2 circle-btn"*/}
                            {/*  data-bs-toggle="offcanvas"*/}
                            {/*  data-bs-target="#Activity_Log"*/}
                            {/*>*/}
                            {/*  <svg*/}
                            {/*    width="21"*/}
                            {/*    height="21"*/}
                            {/*    viewBox="0 0 21 21"*/}
                            {/*    fill="none"*/}
                            {/*    xmlns="http://www.w3.org/2000/svg"*/}
                            {/*  >*/}
                            {/*    <path*/}
                            {/*      d="M10.5 6.19312V10.5008L13.1923 13.1931"*/}
                            {/*      stroke="white"*/}
                            {/*      stroke-width="1.5"*/}
                            {/*      stroke-linecap="round"*/}
                            {/*      stroke-linejoin="round"*/}
                            {/*    />*/}
                            {/*    <path*/}
                            {/*      d="M2.24861 4.97727L1.44092 4.9805C1.44177 5.19341 1.52665 5.39737 1.6771 5.54802C1.82755 5.69868 2.0314 5.78383 2.24431 5.78496L2.24861 4.97727ZM4.98615 5.79789C5.09222 5.79838 5.19734 5.77798 5.29553 5.73785C5.39371 5.69771 5.48303 5.63864 5.55838 5.56398C5.63373 5.48933 5.69364 5.40057 5.73469 5.30277C5.77573 5.20496 5.79712 5.10003 5.79761 4.99396C5.79811 4.8879 5.77771 4.78277 5.73757 4.68459C5.69744 4.5864 5.63836 4.49709 5.56371 4.42174C5.48906 4.34639 5.4003 4.28647 5.30249 4.24543C5.20469 4.20438 5.09976 4.183 4.99369 4.1825L4.98615 5.79789ZM3.04231 2.23112C3.04116 2.01691 2.95497 1.81192 2.80269 1.66126C2.65041 1.51059 2.44452 1.42659 2.23031 1.42774C2.01609 1.42888 1.81111 1.51507 1.66044 1.66735C1.50978 1.81963 1.42578 2.02552 1.42692 2.23974L3.04231 2.23112ZM1.61538 10.5008C1.61538 10.2866 1.53029 10.0812 1.37882 9.92968C1.22734 9.77821 1.0219 9.69311 0.807692 9.69311C0.593479 9.69311 0.388039 9.77821 0.236567 9.92968C0.0850957 10.0812 0 10.2866 0 10.5008H1.61538ZM15.75 19.5954C15.8457 19.5445 15.9301 19.4747 15.9983 19.3904C16.0665 19.3062 16.117 19.209 16.1469 19.1048C16.1767 19.0005 16.1852 18.8913 16.172 18.7837C16.1587 18.6761 16.1239 18.5723 16.0697 18.4784C16.0154 18.3845 15.9429 18.3025 15.8563 18.2373C15.7696 18.1721 15.6708 18.125 15.5656 18.0988C15.4604 18.0726 15.351 18.0678 15.2439 18.0848C15.1368 18.1017 15.0342 18.1401 14.9423 18.1976L15.75 19.5954ZM18.1968 14.9431C18.1393 15.0351 18.1009 15.1376 18.084 15.2447C18.067 15.3518 18.0717 15.4612 18.0979 15.5664C18.1242 15.6716 18.1713 15.7705 18.2365 15.8571C18.3017 15.9437 18.3837 16.0163 18.4776 16.0705C18.5715 16.1247 18.6753 16.1595 18.7829 16.1728C18.8905 16.1861 18.9997 16.1775 19.1039 16.1477C19.2082 16.1178 19.3053 16.0673 19.3896 15.9991C19.4739 15.931 19.5436 15.8465 19.5946 15.7508L18.1968 14.9431ZM3.11231 3.03773C2.96007 3.18854 2.87398 3.39364 2.87297 3.60793C2.87196 3.82221 2.95612 4.02811 3.10692 4.18035C3.25773 4.33258 3.46283 4.41868 3.67711 4.41968C3.89139 4.42069 4.0973 4.33654 4.24954 4.18573L3.11231 3.03773ZM17.8898 3.10989C13.776 -1.00395 7.12815 -1.04488 3.04123 3.04204L4.18277 4.1825C7.62892 0.737429 13.2537 0.75789 16.7483 4.2525L17.8898 3.10989ZM3.04123 3.04204L1.67785 4.40543L2.81938 5.54696L4.18384 4.18466L3.04123 3.04204ZM2.24431 5.78496L4.98615 5.79789L4.99369 4.1825L2.25292 4.16958L2.24431 5.78496ZM3.05631 4.97296L3.04231 2.23112L1.42692 2.23974L1.44092 4.9805L3.05631 4.97296ZM10.5 1.6162C12.8563 1.6162 15.1162 2.55225 16.7824 4.21844C18.4485 5.88463 19.3846 8.14446 19.3846 10.5008H21C21 7.71603 19.8937 5.04532 17.9246 3.07619C15.9555 1.10706 13.2848 0.000813715 10.5 0.000813715V1.6162ZM10.5 19.3854C8.14365 19.3854 5.88381 18.4494 4.21763 16.7832C2.55144 15.117 1.61538 12.8572 1.61538 10.5008H0C0 13.2856 1.10625 15.9563 3.07538 17.9254C5.04451 19.8946 7.71522 21.0008 10.5 21.0008V19.3854ZM14.9423 18.1976C13.5924 18.9789 12.0597 19.3887 10.5 19.3854V21.0008C12.4115 21.0008 14.2046 20.4893 15.75 19.5954L14.9423 18.1976ZM19.3846 10.5008C19.3879 12.0605 18.9781 13.5932 18.1968 14.9431L19.5946 15.7508C20.5181 14.1555 21.0029 12.3442 21 10.5008H19.3846ZM4.24954 4.18573C5.91106 2.53595 8.15853 1.61271 10.5 1.6162V0.000813715C7.73267 -0.00286855 5.07648 1.08834 3.11231 3.03773L4.24954 4.18573Z"*/}
                            {/*      fill="white"*/}
                            {/*    />*/}
                            {/*  </svg>*/}
                            {/*</button>*/}
                          </div>
                        </td>

                        <td>
                          <div className="action-btn-list">
                            {item?.status !== 'pending' && (
                              <button
                                disabled={loadingPdf}
                                className="btn btn-primary2 p-2 circle-btn"
                                onClick={() => handlePdfDownload(item.id)}
                              >
                                {loadingPdf && currentSelectedId === item.id ? (
                                  <RoundSpinner />
                                ) : (
                                  <DownloadIcon />
                                )}
                              </button>
                            )}
                          </div>
                        </td>
                        {/*<td>*/}
                        {/*  <button*/}
                        {/*    className="btn p-0"*/}
                        {/*    onClick={() => handleDeleteRequest(item.id)}*/}
                        {/*  >*/}
                        {/*    <DeleteIcon />*/}
                        {/*  </button>*/}
                        {/*</td>*/}
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
  );
};

export default AdminSideRequestTable;
