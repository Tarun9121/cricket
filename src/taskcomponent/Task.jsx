import { useNavigate } from "react-router-dom";
import { remvoeTaskById } from "../service/loginService";
import { useState } from "react";

export default function Task({ taskId, title, description }) {
    const navigate = useNavigate();

    function goToUpdateForm() {
        navigate("/update-task", {
            state: {
                taskId: taskId
            }
        })
    }

    function goToDeletePage() {
        navigate("/delete-page", {
            state: {
                task:{
                    id: taskId,
                    title: title,
                    description: description
                } 
            }
        })
    }

    function handleOnDeleteClick() {
        remvoeTaskById(taskId);
    }


  return (
    <div className="p-3 border border-b-black">
      <div>
      <div className="uppercase font-bold flex justify-between">
        <div>{title}</div>
        <div className="flex gap-2">
            <button className="btn btn-outline-dark" onClick={goToUpdateForm}>Update Task</button>
            <button className="btn btn-outline-danger" onClick={handleOnDeleteClick}>Delete Task</button>
        </div>
      </div>
        <div className="text-justify first-letter:capitalize">
          {description}
        </div>
        </div>
     
    </div>
  );
}
