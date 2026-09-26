const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const parseResponse = async (response) => {
  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

export const getTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/todos`);
  return parseResponse(response);
};

export const createTodo = async (todo) => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

  return parseResponse(response);
};

export const updateTodo = async (id, todo) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

  return parseResponse(response);
};

export const toggleTodoDone = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}/done`, {
    method: "PATCH",
  });

  return parseResponse(response);
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  return parseResponse(response);
};
