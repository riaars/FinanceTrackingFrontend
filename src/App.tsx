import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";

import * as PATH from "./config/Path";
import AddTransaction from "./pages/AddTransaction";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const Layout = ({ children }: any) => {
    return (
      <div className="app">
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="content">
          <Header />
          <div>{children}</div>
        </div>
      </div>
    );
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.SIGNUP} element={<Signup />} />
          <Route path={PATH.LOGIN} element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route
              path={PATH.DASHBOARD}
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path={PATH.ADD_NEW_TRANSACTION}
              element={
                <Layout>
                  <AddTransaction />
                </Layout>
              }
            />
            <Route
              path={PATH.TRANSACTIONS}
              element={
                <Layout>
                  <Transactions />
                </Layout>
              }
            />
            <Route
              path={PATH.SETTINGS}
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
