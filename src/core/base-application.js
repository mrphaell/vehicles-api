export class BaseApplication {

  constructor(type) {
    this.type = type;
  }
  
  async get() {
      const low = require('lowdb');
      const FileSync = require('lowdb/adapters/FileSync');
      const adapter = new FileSync('db.json');
      const db = low(adapter);

      return db.get(this.type).value();
  }

  
  async getById(id) {
      const low = require('lowdb');
      const FileSync = require('lowdb/adapters/FileSync');
      const adapter = new FileSync('db.json');
      const db = low(adapter);
      
      return db.get(this.type).find({ id: id }).value();
  }

  async create(data) {
      const low = require('lowdb');
      const FileSync = require('lowdb/adapters/FileSync');
      const adapter = new FileSync('db.json');
      const db = low(adapter);
      
      const id = db.get(this.type).size().value() + 1;
      data.id = id;

      return db.get(this.type).push(data).write();
  }

  async update(id, data) {
      const low = require('lowdb');
      const FileSync = require('lowdb/adapters/FileSync');
      const adapter = new FileSync('db.json');
      const db = low(adapter);

      return db.get(this.type).find({ id: id }).assign(data).write();
  }

  async delete(id) {
      const low = require('lowdb');
      const FileSync = require('lowdb/adapters/FileSync');
      const adapter = new FileSync('db.json');
      const db = low(adapter);

      return db.get(this.type).remove({ id: id }).write();
  }

}