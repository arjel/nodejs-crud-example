class CarRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS car (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand TEXT,
	  model TEXT,
	  plate TEXT,
	  owner TEXT
	  )`
    return this.dao.run(sql)
  }
   create(brand, model, plate, owner) {
    return this.dao.run(
      'INSERT INTO car (brand, model, plate, owner) VALUES (?, ?, ?, ?)',
      [brand, model, plate, owner])
  }
  update(car) {
    const { id, brand, model, plate, owner } = car
    return this.dao.run(
      `UPDATE car SET brand = ?, model = ?,plate = ?,owner = ?, WHERE id = ?`,
      [brand, model, plate, owner, id]
    )
  }
  delete(id) {
    return this.dao.run(
      `DELETE FROM car WHERE id = ?`,
      [id]
    )
  }
  getById(id) {
    return this.dao.get(
      `SELECT * FROM car WHERE id = ?`,
      [id])
  }
  getAll() {
    return this.dao.all(`SELECT * FROM car`)
  }
  getByPlate(plate) {
    return this.dao.get(
      `SELECT * FROM car WHERE plate = ?`,
      [plate])
  }
}

module.exports = CarRepository;