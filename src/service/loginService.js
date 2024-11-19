import axios from "axios"

const TaskApi = "http://localhost:8080"

export async function checkUserCrediantals(crediantals) {
    try {
        const response = await axios.post(`${TaskApi}/login/`, crediantals);
        return response;
    } catch(error) {
        throw error;
    }
}

export async function getAllTasks() {
    try {
        const response = await axios.get(`${TaskApi}/task/get-all-task`)
        return response;
    } catch(error) {
        throw error;
    }
}

export async function addNewTask(task) {
    try {
        const response = await axios.post(`${TaskApi}/task/save-new-task`, task)
        return response;
    } catch(error) {
        throw error;
    }
}

export async function updateTaskById(task) {
    try {
        const response = await axios.put(`${TaskApi}/task/update-task`, task)
    }
    catch(error) {
        throw error;
    }
}

export async function getTaskById(taskId) {
    try {
        const response = await axios.get(`${TaskApi}/task/get-task/${taskId}`)
        return response;
    } catch(error) {
        throw error;
    }
}

export async function remvoeTaskById(taskId) {
    try {
        const response = await axios.delete(`${TaskApi}/task/remove-task/${taskId}`)
        return response;
    } catch(error) {
        throw error;
    }
}