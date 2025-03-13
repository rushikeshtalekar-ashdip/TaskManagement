import { useState } from "react";

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (editIndex !== null) {
        
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = { id: editIndex + 1, title: taskTitle, description: taskDescription, deadline: taskDeadline };
            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            
            const newTask = { id: tasks.length + 1, title: taskTitle, description: taskDescription, deadline: taskDeadline };
            setTasks([...tasks, newTask]);
        }


        setTaskTitle("");
        setTaskDescription("");
        setTaskDeadline("");
    };

    
    const handleEdit = (index) => {
        const task = tasks[index];
        setTaskTitle(task.title);
        setTaskDescription(task.description);
        setTaskDeadline(task.deadline);
        setEditIndex(index);
    };


    const handleDelete = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">Task Management Table</h1>

        
            <form onSubmit={handleOnSubmit} className="mb-6 space-y-3">
                <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}
                    className="border p-2 w-full" required /><br />
                <textarea placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}
                    className="border p-2 w-full" required /><br />
                <input type="date" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)}
                    className="border p-2 w-full" required /><br />
                
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {editIndex !== null ? "Update Task" : "Add Task"}
                </button>
                <button type="button" onClick={() => { setTaskTitle(""); setTaskDescription(""); setTaskDeadline(""); setEditIndex(null); }} 
                    className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Clear</button>
            </form>

            
            <table className="w-full border-collapse border border-gray-300 text-center">
                <thead>
                    <tr className="bg-blue-100 text-gray-700">
                        <th className="border p-2">Task ID</th>
                        <th className="border p-2">Task Title</th>
                        <th className="border p-2">Task Description</th>
                        <th className="border p-2">Task Deadline</th>
                        <th className="border p-2">Update</th>
                        <th className="border p-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length === 0 ? (
                        <tr><td colSpan="6" className="text-center p-2">No tasks added yet</td></tr>
                    ) : (
                        tasks.map((task, index) => (
                            <tr key={task.id} className="border">
                                <td className="border p-2">{task.id}</td>
                                <td className="border p-2">{task.title}</td>
                                <td className="border p-2">{task.description}</td>
                                <td className="border p-2">{task.deadline}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                </td>
                                <td className="border p-2">
                                    <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskDashboard;
