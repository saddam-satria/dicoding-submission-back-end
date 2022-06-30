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
}

export default Model;
