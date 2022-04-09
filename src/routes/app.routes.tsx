import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  RouteProps,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/auth.hook";
import { Home, Login, NotFound } from "../pages";

interface IProps extends RouteProps {
  element: JSX.Element;
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  function PrivateRoute({ element }: IProps) {
    return isAuthenticated ? element : <Navigate to="/signin" replace />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/signin" element={<Login />} />
        {/* <PrivateRoute path='/signup' element={<Login />}/> */}
        <Route path="/home">
          <Route index element={<Home />} />
          {/* <Route path=":userName" element={<PrivateRoute element={<ToDoList />} />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
