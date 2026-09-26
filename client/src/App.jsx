import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoDone,
  updateTodo,
} from "./api/todos.js";

const emptyForm = {
  title: "",
  description: "",
};

function App() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.done).length,
    [todos]
  );

  useEffect(() => {
    loadTodos();
  }, []);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditFormChange = (event) => {
    setEditForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter a title before adding the TODO.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      const newTodo = await createTodo(form);
      setTodos((current) => [newTodo, ...current]);
      setForm(emptyForm);
      showNotice("TODO added.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditForm({
      title: todo.title,
      description: todo.description || "",
    });
    setError("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(emptyForm);
  };

  const handleUpdate = async (id) => {
    if (!editForm.title.trim()) {
      setError("Please keep a title for this TODO.");
      return;
    }

    try {
      setBusyId(id);
      setError("");
      const updated = await updateTodo(id, editForm);
      setTodos((current) =>
        current.map((todo) => (todo.id === id ? updated : todo))
      );
      cancelEditing();
      showNotice("TODO updated.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleDone = async (id) => {
    const previousTodos = todos;

    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );

    try {
      setBusyId(id);
      setError("");
      const updated = await toggleTodoDone(id);
      setTodos((current) =>
        current.map((todo) => (todo.id === id ? updated : todo))
      );
    } catch (err) {
      setTodos(previousTodos);
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    const previousTodos = todos;

    setTodos((current) => current.filter((todo) => todo.id !== id));

    try {
      setBusyId(id);
      setError("");
      await deleteTodo(id);
      showNotice("TODO deleted.");
    } catch (err) {
      setTodos(previousTodos);
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <main className="app-shell">
      <section className="app-header">
        <div>
          <p className="eyebrow">Full Stack TODO</p>
          <h1>Tasks</h1>
        </div>
        <div className="counter" aria-label="TODO completion count">
          <strong>{completedCount}</strong>
          <span>done of {todos.length}</span>
        </div>
      </section>

      <form className="todo-form" onSubmit={handleCreate}>
        <div className="field-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleFormChange}
            placeholder="Add a task"
            maxLength={120}
          />
        </div>

        <div className="field-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleFormChange}
            placeholder="Optional details"
            rows="3"
            maxLength={1000}
          />
        </div>

        <button className="primary-button" type="submit" disabled={saving}>
          {saving ? <Loader2 className="spin" size={18} /> : <Plus size={18} />}
          Add TODO
        </button>
      </form>

      {error && <div className="message error">{error}</div>}
      {notice && <div className="message success">{notice}</div>}

      <section className="todo-list" aria-live="polite">
        {loading ? (
          <div className="empty-state">
            <Loader2 className="spin" size={26} />
            Loading TODOs...
          </div>
        ) : todos.length === 0 ? (
          <div className="empty-state">No TODOs yet. Add the first one above.</div>
        ) : (
          todos.map((todo) => {
            const isEditing = editingId === todo.id;
            const isBusy = busyId === todo.id;

            return (
              <article
                className={`todo-item ${todo.done ? "is-done" : ""}`}
                key={todo.id}
              >
                <button
                  className="check-button"
                  type="button"
                  onClick={() => handleToggleDone(todo.id)}
                  disabled={isBusy}
                  aria-label={todo.done ? "Mark as not done" : "Mark as done"}
                  title={todo.done ? "Mark as not done" : "Mark as done"}
                >
                  {todo.done && <Check size={18} />}
                </button>

                <div className="todo-content">
                  {isEditing ? (
                    <div className="edit-fields">
                      <input
                        name="title"
                        value={editForm.title}
                        onChange={handleEditFormChange}
                        maxLength={120}
                      />
                      <textarea
                        name="description"
                        value={editForm.description}
                        onChange={handleEditFormChange}
                        rows="3"
                        maxLength={1000}
                      />
                    </div>
                  ) : (
                    <>
                      <h2>{todo.title}</h2>
                      {todo.description && <p>{todo.description}</p>}
                    </>
                  )}
                </div>

                <div className="todo-actions">
                  {isEditing ? (
                    <>
                      <button
                        className="icon-button"
                        type="button"
                        onClick={() => handleUpdate(todo.id)}
                        disabled={isBusy}
                        aria-label="Save TODO"
                        title="Save TODO"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        className="icon-button"
                        type="button"
                        onClick={cancelEditing}
                        disabled={isBusy}
                        aria-label="Cancel edit"
                        title="Cancel edit"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="icon-button"
                        type="button"
                        onClick={() => startEditing(todo)}
                        aria-label="Edit TODO"
                        title="Edit TODO"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="icon-button danger"
                        type="button"
                        onClick={() => handleDelete(todo.id)}
                        disabled={isBusy}
                        aria-label="Delete TODO"
                        title="Delete TODO"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}

export default App;
