import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AdminMode() {
  const navigate = useNavigate();

  function handleLogout() {
    const token = localStorage.getItem("token");
    if (token != null) {
      localStorage.setItem("token", "");
      navigate("/");
    }
  }
  
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center py-8">
      <div className="flex gap-6 mb-8">
        <Button
          onClick={() => navigate("/admin-mode/series-form")}
          className="bg-black text-white hover:bg-gray-800 w-40 py-3 rounded-md shadow-md transition-all duration-300"
        >
          Add Series
        </Button>
        <Button
          onClick={() => navigate("/admin-mode/match-form")}
          className="bg-black text-white hover:bg-gray-800 w-40 py-3 rounded-md shadow-md transition-all duration-300"
        >
          Add Matches
        </Button>
        <Button
          className="bg-black text-white hover:bg-gray-800 w-40 py-3 rounded-md shadow-md transition-all duration-300"
        >
          Add Players
        </Button>
        <Button
          className="bg-black text-white hover:bg-gray-800 w-40 py-3 rounded-md shadow-md transition-all duration-300"
        >
          Add Teams
        </Button>
      </div>

      <div className="flex justify-end w-full px-6 mt-6">
        <Button
          variant="danger"
          onClick={handleLogout}
          className="bg-black text-white hover:bg-gray-800 px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          Disable Admin Mode
        </Button>
      </div>
    </div>
  );
}
