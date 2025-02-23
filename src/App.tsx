import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";

import * as PATH from "./config/Path";
import AddTransaction from "./pages/AddTransaction";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Transactions from "./pages/Transactions";

function App() {
  const Layout = ({ children }: any) => {
    const location = useLocation();
    const hideAppBarRoutes = ["/login", "/signup"];

    return (
      <>
        {!hideAppBarRoutes.includes(location.pathname) ? (
          <div className="app">
            <div className="sidebar">
              <Sidebar />
            </div>
            <div className="content">
              <Header />
              <div>{children}</div>
            </div>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </>
    );
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={PATH.SIGNUP} element={<Signup />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.ADD_NEW_TRANSACTION} element={<AddTransaction />} />
          <Route path={PATH.TRANSACTIONS} element={<Transactions />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
