const db = require('../config/db');

class Todo {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM todos');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM todos WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(title, description) {
    const [result] = await db.query(
      'INSERT INTO todos (title, description) VALUES (?, ?)',
      [title, description]
    );
    return result.insertId;
  }

  static async update(id, title, description) {
    await db.query(
      'UPDATE todos SET title = ?, description = ? WHERE id = ?',
      [title, description, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM todos WHERE id = ?', [id]);
  }
}

module.exports = Todo;