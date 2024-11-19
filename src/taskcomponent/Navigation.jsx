import { useNavigate } from "react-router-dom";

export default function Navigation() {
    const navigate = useNavigate();

    

    return (
        <div className="flex justify-between">
            <div className="text-xl font-bold">
                Task Management System 
            </div>
            <div>
                <button className="px-3 py-2 bg-slate-800 text-white" onClick={() => navigate("/add-task-form")}>Add Task</button>
            </div>
        </div>
    );
}