import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AuthenticationContext } from "./helpers/AuthenticationContext";
import LoginPage from "./pages/LoginPage";
import ScreenLoader from "./components/loader/ScreenLoader";
const PrivateRoutes = () => {
    const { verifyLogin } = useContext(AuthenticationContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const checkAuthentication = async () => {
        const isValid = await verifyLogin();
        setIsAuthenticated(isValid);
        setLoading(false);
      };
  
      checkAuthentication();
    }, [verifyLogin]);
  
    if (loading) return <ScreenLoader />;
  
    if (!isAuthenticated) return <Navigate to={"/login"} replace />;
  
    return <Outlet />;
};
const Routes = () => {
  return (
    <Router>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Router>
  );
};

export default Routes;
