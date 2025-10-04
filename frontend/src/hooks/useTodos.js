import { useState, useCallback } from "react";
import toast from "react-hot-toast";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTodo = async (text, userId) => {
    if (!text.trim() || !userId) return;

    const previousTodos = [...todos]; // Save current state for rollback
    try {
      setLoading(true);
      const res = await fetch("/api/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, userId }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const newTodo = await res.json();
      setTodos((prev) => [newTodo, ...prev]);
      toast.success("Todo created successfully");
    } catch (error) {
      setTodos(previousTodos); // Rollback on error
      toast.error("Failed to create todo");
      console.error("Error creating todo:", error);
    } finally {
      setLoading(false); // Ensure loading is always set to false
    }
  };

  // Make loadTodos memoized with useCallback
  const loadTodos = useCallback(async (userId) => {
    if (!userId) return;

    // Create an AbortController for this request
    const controller = new AbortController();
    setLoading(true);

    try {
      const res = await fetch(`/api/todos/user/${userId}`, {
        signal: controller.signal, // Add abort signal to the request
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      if (error.name === "AbortError") {
        // Request was aborted, ignore the error
        return;
      }
      console.error("Error loading todos:", error);
      setTodos([]);
      toast.error("Failed to load todos");
    } finally {
      setLoading(false);
    }

    return () => controller.abort(); // Return cleanup function
  }, []);

  const toggleTodo = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/todos/${id}/toggle`, {
        method: "PATCH",
      });
      const updatedTodo = await res.json();
      if (updatedTodo.error) {
        throw new Error(updatedTodo.error);
      }
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      toast.success("Todo toggled successfully");
    } catch (error) {
      toast.error("Failed to toggle todo");
      console.error("Error toggling todo:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, text, completed) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, completed }),
      });
      const updatedTodo = await res.json();
      if (updatedTodo.error) {
        throw new Error(updatedTodo.error);
      }
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      toast.success("Todo updated successfully");
    } catch (error) {
      toast.error("Failed to update todo");
      console.error("Error updating todo:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete todo");
      console.error("Error deleting todo:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Ensure todos is always an array before using filter
  const todosArray = Array.isArray(todos) ? todos : [];

  const stats = {
    total: todosArray.length,
    completed: todosArray.filter((todo) => todo.completed).length,
    pending: todosArray.filter((todo) => !todo.completed).length,
  };

  return {
    todos: Array.isArray(todos) ? todos : [],
    loading,
    stats,
    addTodo,
    loadTodos,
    toggleTodo,
    updateTodo,
    deleteTodo,
  };
};

export default useTodos;
