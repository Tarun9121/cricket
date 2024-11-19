import { useEffect, useState } from "react";
import Task from "./Task";
import { getAllTasks } from "../service/loginService";
import Navigation from "./Navigation";

export default function Home() {
    const [allTasks, setAllTasks] = useState();

    async function handleGetAllTasks() {
        try {
            const response = await getAllTasks();
            console.log(response)
            if(response.status === 200) {
                setAllTasks(response.data);
            }

        } catch(error) {
            throw error;
        }
    }

    useEffect(() => {
        handleGetAllTasks();
    }, [])

    return (
        <div className="border border-slate-200 p-2 flex flex-col gap-3">
            <div>
                <Navigation />
            </div>
            {
                allTasks && allTasks.length > 0 ?
                allTasks.map((task) => (
                    <Task key={task.id}
                        taskId={task.id}
                        title={task.title}
                        description={task.description}
                    />
                ))
                :
                <div>You don't have any tasks</div>
            }
        </div>
    );
}