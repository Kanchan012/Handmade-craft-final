import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import AppRoutes from "./routes/AppRoutes";
function App() {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
