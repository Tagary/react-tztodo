import TodoModel from '../models/Todo.js';

export const getTodo = async (req, res) => {
  try {
    const todo = await TodoModel.find();
    res.json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить таблицу',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new TodoModel({
      title: req.body.title,
      amount: req.body.amount,
      distance: req.body.distance,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать параметр в таблице',
    });
  }
};
