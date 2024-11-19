import { useEffect, useState } from "react";
import { addNewTask, getTaskById } from "../service/loginService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UpdateTaskForm() {
    const location = useLocation();
    const [taskId, setTaskId] = useState(location.state.taskId);

    const [task, setTask] = useState({
        title: "",
        description: ""
    });
    const [submitted, setSubmitted] = useState();

    const navigate = useNavigate();

    const [errors, setErrors] = useState();

    async function handleGetTaskById(taskId) {
        try {
            const response = await getTaskById(taskId);
            if(response.status == 200) {
                setTask(response.data);
            }
        } catch(error) {
            throw error;
        }
    }


    useEffect(() => {
        handleGetTaskById(taskId);
        console.log(taskId);
    }, [])

    const  handleSubmit =  async (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if(isValid) {
            const response = await addNewTask(task);
            if(response.status === 200) {
                setSubmitted("success")
                setTimeout(() => {
                    navigate("/home")
                }, 3000)
            }
        }
    }

    function validateForm() {
        const error = {}

        if(task.title == "") {
            error.title = "Title must not be empty"
        }
        if(task.description == "") {
            error.description = "Please tell me what your task is"
        }

        setErrors(error);
        return Object.keys(error).length === 0;
    }

    const handleChange = (e) => {
        const {name, value} = e.target

        setTask({
            ...task,
            [name]:value
        })

        errors[name] = ""
    }

    return (
        <div className="p-3">
            {
                submitted && submitted === "success" ?
                <div className="bg-green-50 p-3">Data saved successfully, navigating to Home page...</div>
                :
                submitted === "failure" ?
                <div className="bg-red-50 p-3">Something went wrong, please try after some time</div>
                : <div></div>
            }
            <form onSubmit={handleSubmit} className="border border-slate-200 shadow-xl rounded-xl p-3">
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" value={task.title} onChange={handleChange} className="form-control" placeholder="Enter Task Title" />
                </div>
                {errors && errors.title ? <div className="text-red-500">{errors.title}</div> : <div></div>}
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" name="description" value={task.description} onChange={handleChange} className="form-control" placeholder="Enter Task Description" />
                </div>
                {errors && errors.description ? <div className="text-red-600">{errors.description}</div> : <div></div>}
                <div>
                    <button className="btn btn-dark" type="submit">Add Task</button>
                </div>
            </form>
        </div>
    );
}