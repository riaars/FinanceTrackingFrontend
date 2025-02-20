import "./App.css";
import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

function App() {
  return (
    <>
      <div className="app">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main-content">
          <Header />
          <MainContent />
        </div>
      </div>
    </>
  );
}

export default App;
