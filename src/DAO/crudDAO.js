class CrudDAO {

  constructor(model, key) {
    this.model = model;
    this.modelName = model.modelName.toLowerCase();
    this.key = key;
  }

  get(item) {
    return this.model.find(item).then();
  }

  post(item) {
    return this.model.create(item).then();
  }

  list(query, pagination = { ignore: 0 , limit: 10}) {
    return this.model
      .find(query)
      .skip(pagination.ignore)
      .limit(pagination.limit)
      .then()
  }

  delete(criteria, item) {
    return this.model.deleteOne(criteria, item).then();
  }

  push(id, item) {
    return  this.model.updateOne(id, { $push: item })
  }

  pull(id, item) {
    return this.model.updateOne(id, { $pull: item});
  }

  update(id, item) {
    return this.model.updateOne({ _id: id }, { $set: item }).then();
  }
}

module.exports = CrudDAO;