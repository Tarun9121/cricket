import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ConformDelete() {
    const locaiton = useLocation();
    const [task, setTask] = useState(location.state.task);

    async function removeTask(taskId) {
        try {
            const response = await remvoeTaskById(taskId);
            if(response.status === 200) {
                alert("deleted")
                isDeleted((prev) => !prev)
                navigate("/home")
            }
            else {
                alert("not deleted")
            }
        } catch(error) {
            alert("unexpected error")
        }
    }

    function handleOnDeleteClick() {
        removeTask(task.id);
    }

    return (
        <div>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div className="flex justify-end px-3">
                <button className="btn btn-danger" onClick={handleOnDeleteClick}>Confirm Delete</button>
            </div>
        </div>
    );
}