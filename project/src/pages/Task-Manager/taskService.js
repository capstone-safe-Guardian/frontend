import axios from "axios";

const API_BASE_URL = "http://localhost:8060/api/tasks";

// Function to add a new task
export const addTask = async (task) => {
    try {

      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken'); 
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      if (!token) {
        alert("Authentication token is missing. Please log in.");
        return;
      }

        const response = await axios.post(`${API_BASE_URL}`, task, {
            headers: {
                'Authorization': `Bearer ${token}`, // Add token to the Authorization header
              }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};

// Function to get the current user ID from local storage
export const getCurrentUserId = () => {
    return localStorage.getItem('userId');
};

// Function to get tasks for a specific user
export const getTasks = async (userId) => {
    try {
    const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken'); 
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }
      if (!token) {
        alert("Authentication token is missing. Please log in.");
        return;
      }
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`,{
            headers: {
                'Authorization': `Bearer ${token}`, // Add token to the Authorization header
              }
        }
        
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

// Function to fetch notifications for a specific user
export const fetchNotifications = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/notifications/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};



// Function to update task priority
export const updateTaskPriority = async (taskId, newPriority) => {
    try {
    const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken'); 

      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      if (!token) {
        alert("Authentication token is missing. Please log in.");
        return;
      }

        const response = await axios.patch(`${API_BASE_URL}/${taskId}/priority`, { priority: newPriority }, {
            headers: {
                'Authorization': `Bearer ${token}`, // Add token to the Authorization header
              }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task priority:", error);
        throw error;
    }
};

// Function to update task text
export const updateTaskText = async (taskId, newText) => {
    try {
        const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken'); 
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      if (!token) {
        alert("Authentication token is missing. Please log in.");
        return;
      }
        const response = await axios.patch(`${API_BASE_URL}/${taskId}/text`, { text: newText }, {
            headers: {
                'Authorization': `Bearer ${token}`, // Add token to the Authorization header
              }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task text:", error);
        throw error;
    }
};

// Function to update task reminder
export const updateTaskReminder = async (taskId, reminderTime) => {
    try {
        const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken'); 
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      if (!token) {
        alert("Authentication token is missing. Please log in.");
        return;
      }
        const response = await axios.patch(`${API_BASE_URL}/${taskId}/reminder`, { reminderTime }, {
            headers: {
                'Authorization': `Bearer ${token}`, // Add token to the Authorization header
              }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task reminder:", error);
        throw error;
    }
};

// Function to delete a task
export const deleteTask = async (taskId) => {
    try {
        const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken'); 
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      if (!token) {
        alert("Authentication token is missing. Please log in.");
        return;
      }
        await axios.delete(`${API_BASE_URL}/${taskId}`,{
            headers: {
                'Authorization': `Bearer ${token}`, // Add token to the Authorization header
              }
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};
