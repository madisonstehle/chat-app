'use strict';

const userSchema = require('./user-schema.js');

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  async create(record) {
    try {
      let recordToAdd = new this.schema(record);
      return await recordToAdd.save();
    }
    catch(e) {
      console.error('ERROR CREATING RECORD', e);
      return false;   
    }
  }

  async readOne(_id) {
    try {
      let record = await this.schema.findOne({_id});
      return record;
    }
    catch(e) {
      console.error('ERROR FINDING RECORD', e);
      return false;
    }
  }

  async readByQuery(query) {
    try {
      let records = await this.schema.find(query);
      return records;
    }
    catch(e) {
      console.error('ERROR FINDING RECORDS', e);
      return false;
    }
  }

  async update(_id, changedRecord) {
    try {
      let newRecord = await this.schema.findByIdAndUpdate({_id}, changedRecord);
      return newRecord;
    }
    catch(e) {
      console.error('ERROR UPDATING RECORD', e);
      return false;
    }
  }

  async delete(_id) {
    try {
      await this.schema.deleteOne({_id});
      return _id;
    }
    catch(e) {
      console.error('ERROR DELETING RECORD', e);
      return false;
    }
  }
}

module.exports = {
  userModel: new Model(userSchema)
};