class Model {
  constructor() {
    this.model = [];
  }
  create(payload) {
    this.model.push(payload);
  }
  all() {
    return this.model;
  }
  getByID(id) {
    const book = this.model.filter((item) => item.id == id);
    return book.length > 0 ? book[0] : null;
  }
  update(id, payload) {
    const prevModel = this.getByID(id);

    if (!prevModel) return null;

    const updatedData = { ...prevModel, ...payload };

    this.model = [updatedData, ...this.model.filter((item) => item.id !== id)];

    return this.model;
  }
  delete(id) {
    this.model = this.model.filter((item) => item.id !== id);

    return this.model;
  }
}

export default Model;
