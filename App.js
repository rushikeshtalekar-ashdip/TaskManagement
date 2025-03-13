// Frontend code 
// Filename - App.js
// Filename - App.js

import { useState } from 'react'
function App() {
    const [tasks, setTasks] = useState([]);
    const [tasktitle, setTaskTitle] = useState("");
    const [taskdescription, setTaskDesciption] = useState("");
    const [taskdeadline, setTaskDeadline] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({ tasktitle, taskdescription , taskdeadline}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");

            if (editIndex !== null) {
        
                const updatedTasks = [...tasks];
                updatedTasks[editIndex] = { id: editIndex + 1, title: tasktitle, description: taskdescription, deadline: taskdeadline };
                setTasks(updatedTasks);
                setEditIndex(null);
            } else {
                
                const newTask = { id: tasks.length + 1, title: tasktitle, description: taskdescription, deadline: taskdeadline };
                setTasks([...tasks, newTask]);
            }

            setTaskDesciption("");
            setTaskTitle("");
            setTaskDeadline("");
        }
    }

    const handleEdit = (index) => {
        const task = tasks[index];
        setTaskTitle(task.title);
        setTaskDesciption(task.description);
        setTaskDeadline(task.deadline);
        setEditIndex(index);
    };


    const handleDelete = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <>

            <div class="form-container">
                <h2 class="txtCenter">Enter Task Details</h2>

                <form action="#" >

                <table  cellpadding="20">
                    <tbody>
                        <tr>
                            <td><label class="block text-gray-700">Task Title</label></td>
                            <td><input type="text" placeholder="Enter task title" maxlength="255" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    value={tasktitle} onChange={(e) => setTaskTitle(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label class="block text-gray-700">Task Description</label></td>
                            <td><textarea 
                                    name="taskDescription" 
                                    maxlength="255" 
                                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    placeholder="Enter task description" 
                                    value={taskdescription} onChange={(e) => setTaskDesciption(e.target.value)}
                                    required></textarea></td>
                        </tr>
                        <tr>
                            <td><label class="block text-gray-700">Task Deadline</label></td>
                            <td><input type="date" name="taskDeadline" placeholder="Enter task title" maxlength="255" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    value={taskdeadline} onChange={(e) => setTaskDeadline(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" onClick={handleOnSubmit} class="txtRight">Submit Task </button>
                            </td>
                            <td><button type="clear" class="txtRight">Clear </button></td>
                        </tr>
                    </tbody>
                    </table>
                    
                </form>
                <table border={1}>
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
        </>
    );
}

export default App;