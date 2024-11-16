import React, { useEffect, useState } from "react";
import axios from 'axios';
import { getTasks, addTask, updateTaskPriority, deleteTask, updateTaskText, updateTaskReminder, getCurrentUserId } from './taskService';
import { format } from 'date-fns';
import { Bell, Edit, Trash2, Save } from 'lucide-react';
import './TaskDashboard.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { fetchNotifications } from './taskService';

const API_URL = 'http://localhost:8060/api/tasks';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [textInput, setTextInput] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("High");
    const [reminderTime, setReminderTime] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [taskText, setTaskText] = useState("");
    const [alert, setAlert] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const userId = getCurrentUserId();
        fetchTasks(userId);
        fetchNotificationsFromApi(userId); // Use renamed function
        const intervalId = setInterval(() => {
            fetchNotificationsFromApi(userId); // Use renamed function
        }, 60000); 
        return () => clearInterval(intervalId);
    }, []);
    
    // Fetch tasks for the current user
    const fetchTasks = async (userId) => {
        try {
            const tasksData = await getTasks(userId);
            setTasks(tasksData);
        } catch (error) {
            showAlert("Error fetching tasks", "error");
        }
    };

    // Fetch notifications for due tasks
    const fetchNotificationsFromApi = async (userId) => {
        try {
            const notificationsData = await fetchNotifications(userId); // Assuming getNotifications is the correct function
            if (notificationsData && notificationsData.length > 0) {
                setNotifications(notificationsData);
                showAlert("You have new notifications", "info");
            }
        } catch (error) {
            console.error("Error fetching notifications", error);
        }
    };

    // Show alert messages for actions
    const showAlert = (message, type = "success") => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000);
    };

    // Handle adding a new task
    const handleTaskSubmit = async (e) => {
        e.preventDefault(); 
        if (textInput.trim() === "") return;

        try {
            const userId = localStorage.getItem('userId');
            const newTask = { 
                userId, // Include the user ID
                text: textInput, 
                priority: selectedPriority,
                reminderTime: reminderTime ? new Date(reminderTime).toISOString() : null
            };
            const addedTask = await addTask(newTask);
            setTasks([...tasks, addedTask]);
            setTextInput("");
            setSelectedPriority("High");
            setReminderTime("");
            showAlert("Task added successfully");
        } catch (error) {
            showAlert("Error adding task", "error");
        }
    };

    // Update task priority
    const handlePriorityUpdate = async (taskId, newPriority) => {
        try {
            const updatedTask = await updateTaskPriority(taskId, newPriority);
            setTasks(tasks.map(task => task.taskId === taskId ? updatedTask : task));
            showAlert("Task priority updated");
        } catch (error) {
            showAlert("Error updating task priority", "error");
        }
    };

    // Update task text
    const handleTextUpdate = async (taskId) => {
        if (taskText.trim() !== "") {
            try {
                await updateTaskText(taskId, taskText);
                setTasks(tasks.map(task => task.taskId === taskId ? { ...task, text: taskText } : task));
                setEditingTask(null);
                setTaskText("");
                showAlert("Task text updated");
            } catch (error) {
                showAlert("Error updating task text", "error");
            }
        }
    };

    // Handle task deletion
    const handleRemove = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.taskId !== taskId));
            showAlert("Task deleted successfully");
        } catch (error) {
            showAlert("Error deleting task", "error");
        }
    };

    // Handle reminder updates
    const handleReminderUpdate = async (taskId, newReminderTime) => {
        try {
            const updatedTask = await updateTaskReminder(taskId, newReminderTime);
            setTasks(tasks.map(task => task.taskId === taskId ? updatedTask : task));
            showAlert("Reminder set successfully");
        } catch (error) {
            showAlert("Error setting reminder", "error");
        }
    };

    // Clear notifications
    const handleClearNotifications = () => {
        setNotifications([]);
        showAlert("Notifications cleared");
    };

    // Filter tasks by priority
    const getTasksByPriority = (priority) => tasks.filter((task) => task.priority === priority);

    return (
        <div className="task-dashboard">
            {<Header />}
            <div className="task-dashboard-header">
                <h1>Task Dashboard</h1>
                <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
                    <Bell size={22} />
                    {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
                </div>
                {showNotifications && (
                    <div className="notification-dropdown">
                        {notifications.length > 0 ? (
                            <>
                                {notifications.map((task, index) => (
                                    <div key={index} className="notification-item">
                                        <span>{`Reminder: ${task.text}`}</span>
                                    </div>
                                ))}
                                <button onClick={handleClearNotifications} className="clear-notifications-btn">
                                    Clear Notifications
                                </button>
                            </>
                        ) : (
                            <div className="notification-item">No new notifications</div>
                        )}
                    </div>
                )}
            </div>

            <div className="task-input">
                <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter task"
                />
                <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                </select>
                <input
                    type="datetime-local"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                />
                <button onClick={handleTaskSubmit}>Add Task</button>
            </div>

            <div className="task-lists">
                {["High", "Medium", "Low"].map((priority) => (
                    <div key={priority} className="task-list">
                        <h2>{priority} Priority Tasks</h2>
                        {getTasksByPriority(priority).map((task) => (
                            <div key={task.taskId} className="task-item">
                                {editingTask?.taskId === task.taskId ? (
                                    <div className="task-edit">
                                        <input
                                            type="text"
                                            value={taskText}
                                            onChange={(e) => setTaskText(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleTextUpdate(task.taskId)}
                                        />
                                        <button onClick={() => handleTextUpdate(task.taskId)}><Save size={16} /> Save</button>
                                    </div>
                                ) : (
                                    <span>{task.text}</span>
                                )}
                                <div className="task-actions">
                                    <select
                                        value={task.priority}
                                        onChange={(e) => handlePriorityUpdate(task.taskId, e.target.value)}
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                    <button onClick={() => {
                                        setEditingTask(task);
                                        setTaskText(task.text);
                                    }}><Edit size={16} /> Edit</button>
                                    <button onClick={() => handleRemove(task.taskId)}><Trash2 size={16} /> Delete</button>
                                    <input
                                        type="datetime-local"
                                        value={task.reminderTime ? format(new Date(task.reminderTime), "yyyy-MM-dd'T'HH:mm") : ""}
                                        onChange={(e) => handleReminderUpdate(task.taskId, e.target.value)}
                                    />
                                    {task.reminderTime && (
                                        <span className="reminder-icon">🔔</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {<Footer />}

            {alert && (
                <div className={`alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}
        </div>
    );
};

export default TaskDashboard;
