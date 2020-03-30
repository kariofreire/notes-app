const db = require('../database/db');

module.exports = {
  async index(req, res) {
    const tasks = await db('tasks').select('*');
    res.json(tasks);
  },
  async create(req, res) {
    const { description } = req.body;
    await db('tasks').insert({ description });
    res.json({ message: 'Tarefa cadastrada com sucesso!' });
  },
  async update(req, res) {
    const { id } = req.params;

    await db('tasks')
      .where('id', id)
      .update(req.body);

    res.json({ message: 'Tarefa atualizada com sucesso!' });
  },
  async remove(req, res) {
    const { id } = req.params;

    await db('tasks')
      .where('id', id)
      .del();

    res.json({ message: 'Tarefa removida com sucesso!' });
  }
}