import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  RouteProps,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/auth.hook";
import { Lives, Categories, Login, NotFound, SignUp, Stream } from "../pages";

interface IProps extends RouteProps {
  element: JSX.Element;
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  function PrivateRoute({element}: IProps) {
    return isAuthenticated ? element : <Navigate to="/signin" replace />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/lives" replace />} />
        <Route path="/signin" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" replace />} />
        <Route path="/lives">
          <Route index element={<Lives />} />
          <Route path=":profileName" element={<Stream />} />
        </Route>
        <Route path="/categories">
          <Route index element={<Categories />} />
          <Route path=":categoryName" element={<Stream />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
