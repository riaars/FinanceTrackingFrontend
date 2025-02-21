import Header from "./layout/Header";
import Content from "./layout/Content";
import Sidebar from "./layout/Sidebar";

function App() {
  return (
    <>
      <div className="app">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Header />
          <Content />
        </div>
      </div>
    </>
  );
}

export default App;
