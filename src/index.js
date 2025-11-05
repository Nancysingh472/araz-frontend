import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AdminLayout from './layouts/AdminLayout';
import AdminProfile from './pages/admin/AdminProfile';
import AdminUserManagement from './pages/Staff/AdminUserManagement';
import AdminSupportTickets from './pages/SupportManagement/AdminSupportTickets';
import AdminNewRequest from './pages/admin/AdminNewRequest';
import AdminNewRequest2 from './pages/admin/AdminNewRequest2';
import AdminEditDocument from './pages/Documents/AdminEditDocument';
import AdminPreviewDocument from './pages/Documents/AdminPreviewDocument';
import AdminFormMaster from './pages/Forms/AdminFormMaster';
import AdminFormEdit from './pages/Forms/AdminFormEdit';
import AdminFormPreview from './pages/Forms/AdminFormPreview';
import AdminCategoryMasters from './pages/Categories/AdminCategoryMasters';
import AdminRazaProgress from './pages/admin/AdminRazaProgress';
import AdminOverview2 from './pages/admin/AdminOverview2';
import AdminUploadBulkJawab from './pages/admin/AdminUploadBulkJawab';
import AdminCompilationOfRequests from './pages/admin/AdminCompilationOfRequests';
import AdminSignIn from './pages/admin/AdminSignIn';
import AdminSubCategory from './pages/SubCategories/AdminSubCategory';
import AdminChildCategory from './pages/ChildCategories/AdminChildCategory';
import Jammat from './pages/Jamaat/Jammat';
import Jamiat from './pages/Jamiat/Jamiat';
import BusinessType from './pages/BusinessType/BusinessType';

import { AuthProvider } from './contexts/AuthContext';
import NotFound from './pages/NotFound';
import ProtectedRoute from './services/ProtectedRoute';

import UserLayout from './layouts/UserLayout';
import UserDashboard from './pages/user/dashboard/UserDashboard';
import UserHome from './pages/user/UserHome';
import UserSignIn from './pages/user/UserSignIn';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './global.scss';
import 'react-toastify/dist/ReactToastify.css';
import './i18n';
import DocumentMaster from './pages/Documents/DocumentMaster';
import ArazRequestMaster from './pages/user/ArazRequest/ArazRequestMaster';
import UserDraft from './pages/user/ArazRequest/UserDraft';
import ReviewRequestMaster from './pages/admin/ReviewRequest/ReviewRequestMaster';
import IstershaadMaster from './pages/Istershaad/IstershaadMaster';
import ManzooriMaster from './pages/Manzoori/ManzooriMaster';
import JawabMaster from './pages/JawabMaster/JawabMaster';
import RazaUploadBulkJawab from './pages/admin/dashboard/AdminUploadBulkJawab';
import AdminDashboardMaster from './pages/admin/dashboard/AdminDashboardMaster';
import NotificationManagement from './pages/NotificationManagement/NotificationManagement';
import UserSupportTickets from './pages/user/UserSupportManagement/UserSupportTickets';
import EditRazaDocuments from './pages/admin/ReviewRequest/EditRazaDocuments';
import PDfDownload from './components/common/PDfDownload';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                redirectPath="/user/signin"
                renderBasedOnRole={({ isLoggedIn, userData }) =>
                  isLoggedIn ? (
                    userData?.role?.name === 'SuperAdmin' || userData?.role?.name === 'Verifier' ? (
                      <Navigate to="/admin/dashboard" replace />
                    ) : (
                      <Navigate to="/user/home" replace />
                    )
                  ) : (
                    <Navigate to="/user/signin" replace />
                  )
                }
              />
            }
          />

          {/* User Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route
              index
              element={
                <ProtectedRoute
                  redirectPath="/user/signin"
                  renderBasedOnRole={({ isLoggedIn }) =>
                    isLoggedIn ? (
                      <Navigate to="/user/home" replace />
                    ) : (
                      <Navigate to="/user/signin" replace />
                    )
                  }
                />
              }
            />
            <Route path="signin" element={<UserSignIn />} />
            <Route
              path="home"
              element={<ProtectedRoute requiredRoles={['User']} element={<UserHome />} />}
            />
            <Route
              path="dashboard"
              element={<ProtectedRoute requiredRoles={['User']} element={<UserDashboard />} />}
            />
            <Route
              path="support"
              element={<ProtectedRoute requiredRoles={['User']} element={<UserSupportTickets />} />}
            />
            <Route
              path="UserArazForm"
              element={<ProtectedRoute requiredRoles={['User']} element={<ArazRequestMaster />} />}
            />
            <Route
              path="draftRequest"
              element={<ProtectedRoute requiredRoles={['User']} element={<UserDraft />} />}
            />
            {/*<Route*/}
            {/*  path="UserArazPreview"*/}
            {/*  element={<ProtectedRoute element={<UserArazPreview />} />}*/}
            {/*/>*/}
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={
                <ProtectedRoute
                  redirectPath="/admin/signin"
                  renderBasedOnRole={({ isLoggedIn, userData }) =>
                    isLoggedIn && (userData?.role?.name === 'SuperAdmin' || userData?.role?.name === 'Verifier') ? (
                      <Navigate to="/admin/dashboard" replace />
                    ) : (
                      <Navigate to="/admin/signin" replace />
                    )
                  }
                />
              }
            />
            <Route path="signin" element={<AdminSignIn />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute
                  element={<AdminDashboardMaster />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="Profile"
              element={
                <ProtectedRoute
                  element={<AdminProfile />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="NotificationManagement"
              element={
                <ProtectedRoute
                  element={<NotificationManagement />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="UserManagement"
              element={
                <ProtectedRoute
                  element={<AdminUserManagement />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="SupportTickets"
              element={
                <ProtectedRoute
                  element={<AdminSupportTickets />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="NewRequest"
              element={
                <ProtectedRoute
                  element={<AdminNewRequest />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="NewRequest2"
              element={
                <ProtectedRoute
                  element={<AdminNewRequest2 />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="Document"
              element={
                <ProtectedRoute
                  element={<DocumentMaster />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="Istershaad"
              element={
                <ProtectedRoute
                  element={<IstershaadMaster />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="Manzoori"
              element={
                <ProtectedRoute
                  element={<ManzooriMaster />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="JawabMaster"
              element={
                <ProtectedRoute
                  element={<JawabMaster />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="RazaUploadBulkJawab"
              element={
                <ProtectedRoute
                  element={<RazaUploadBulkJawab />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="EditDocument"
              element={
                <ProtectedRoute
                  element={<AdminEditDocument />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="pdf/:documentId"
              element={
                <ProtectedRoute
                  element={<PDfDownload />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="PreviewDocument"
              element={
                <ProtectedRoute
                  element={<AdminPreviewDocument />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="FormMaster"
              element={
                <ProtectedRoute
                  element={<AdminFormMaster />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="FormEdit"
              element={
                <ProtectedRoute
                  element={<AdminFormEdit />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="FormPreview"
              element={
                <ProtectedRoute
                  element={<AdminFormPreview />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="CategoryMasters"
              element={
                <ProtectedRoute
                  element={<AdminCategoryMasters />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="SubCategory"
              element={
                <ProtectedRoute
                  element={<AdminSubCategory />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="ChildCategory"
              element={
                <ProtectedRoute
                  element={<AdminChildCategory />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="jamiat"
              element={
                <ProtectedRoute
                  element={<Jamiat />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="jammat"
              element={
                <ProtectedRoute
                  element={<Jammat />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="business-type"
              element={
                <ProtectedRoute
                  element={<BusinessType />}
                  requiredRoles={['SuperAdmin']}
                />
              }
            />
            <Route
              path="RazaProgress"
              element={
                <ProtectedRoute
                  element={<AdminRazaProgress />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="request-review/:requestId"
              element={
                <ProtectedRoute
                  element={<ReviewRequestMaster />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="request-review/:requestId/document/:documentId"
              element={
                <ProtectedRoute
                  element={<EditRazaDocuments />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="Overview2"
              element={
                <ProtectedRoute
                  element={<AdminOverview2 />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="UploadBulkJawab"
              element={
                <ProtectedRoute
                  element={<AdminUploadBulkJawab />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
            <Route
              path="CompilationOfRequests"
              element={
                <ProtectedRoute
                  element={<AdminCompilationOfRequests />}
                  requiredRoles={['SuperAdmin', 'Verifier']}
                />
              }
            />
          </Route>

          {/* Fallback Route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
