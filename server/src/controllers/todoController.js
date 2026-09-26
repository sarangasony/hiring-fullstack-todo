import mongoose from "mongoose";
import Todo from "../models/Todo.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim() || "";

    if (!title) {
      return res.status(400).json({ message: "Please enter a title." });
    }

    const todo = await Todo.create({ title, description });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid TODO id." });
    }

    const title = req.body.title?.trim();
    const description = req.body.description?.trim() || "";

    if (!title) {
      return res.status(400).json({ message: "Please enter a title." });
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "TODO not found." });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const toggleTodoDone = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid TODO id." });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "TODO not found." });
    }

    todo.done = !todo.done;
    await todo.save();

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid TODO id." });
    }

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "TODO not found." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
