import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppSidebar from "./components/app-sidebar";
import SendPage from "./pages/send";
import UsersPage from "./pages/user";
import Dashboard from "./pages/home";
import CreateUserPage from "./pages/create-user";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <div
        className="min-h-screen w-full h-full text-black bg-white flex"
        style={{
          background:
            "linear-gradient(180deg,rgba(255, 255, 255, 1) 0%, rgba(9, 9, 121, 1) 100%)",
        }}
      >
        <Router>
          <div className="min-h-screen bg-black/10 p-5 border-r fixed">
            <AppSidebar />
          </div>

          <div className="w-full p-5 pl-[16rem]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateUserPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/send" element={<SendPage />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
