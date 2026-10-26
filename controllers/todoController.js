const Todo = require("../models/todoModel");

// GET /todo
exports.getAll = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = Todo.find(queryObj);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;
    if (limit > 100) limit = 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const todos = await query;
    
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// GET /todo/:id
exports.getById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404);
      throw new Error("Tugas tidak ditemukan");
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

// POST /todo
exports.create = async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);
    
    const todoObject = todo.toObject();
    todoObject.id = todoObject._id;

    res.status(201).json(todoObject);
  } catch (error) {
    next(error);
  }
};

// PUT /todo/:id
exports.update = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      res.status(404);
      throw new Error("Tugas tidak ditemukan");
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

// DELETE /todo/:id
exports.remove = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      res.status(404);
      throw new Error("Tugas tidak ditemukan");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};