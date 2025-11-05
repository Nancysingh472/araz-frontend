import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({
                          element,
                          requiredRoles = [], // Accept an array of roles
                          redirectPath,
                          renderBasedOnRole,
                        }) => {
  const { isLoggedIn, userData } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  // Normalize the user's role
  const userRole = userData?.role?.name.toLowerCase();

  // Check if the user's role is included in the allowed roles
  const hasAccess = requiredRoles.map((role) => role.toLowerCase()).includes(userRole);

  if (!hasAccess) {
    // Redirect logic for SuperAdmin or Verifier
    if (userRole === 'superadmin' || userRole === 'verifier') {
      return <Navigate to="/admin/dashboard" replace />;
    }

    // Redirect other roles to user home
    return <Navigate to="/user/home" replace />;
  }

  if (renderBasedOnRole) {
    return renderBasedOnRole({ isLoggedIn, userData });
  }

  return element;
};

export default ProtectedRoute;
