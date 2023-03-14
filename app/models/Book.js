import Model from '../config/model.js';

class Book extends Model {
  getByReading(reading) {
    return this.model.filter((item) => item.reading === reading);
  }

  getByFinished(finished) {
    return this.model.filter((item) => item.finished === finished);
  }
  getByName(name) {
    return this.model.filter((item) => item.name.includes(name.toLowerCase()));
  }
}

export default Book;
