import { nanoid } from 'nanoid';
import Book from '../models/Book.js';

const bookModel = new Book();

const messageHandler = ({ name }) => {
  return `Gagal menambahkan buku. Mohon isi ${!name ? 'nama' : 'author'} buku`;
};

const insertBook = (request, handler) => {
  const response = {
    status: 'success',
    message: 'Buku berhasil ditambahkan',
  };
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name || !author || readPage > pageCount) {
    response.status = 'fail';
    response.message = readPage > pageCount ? 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' : messageHandler({ name, author });
    return handler.response(response).code(400);
  }

  const payload = {
    id: nanoid(),
    name,
    year: year ? year : '1992',
    author: author ? author : '',
    summary: summary ? summary : '',
    publisher: publisher ? publisher : '',
    pageCount: pageCount ? pageCount : 0,
    readPage: readPage ? readPage : 0,
    finished: pageCount === readPage ? true : false,
    reading: reading != undefined ? reading : false,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // TODO insert buku
  bookModel.create(payload);

  response.data = {
    bookId: payload.id,
  };
  return handler.response(response).code(201);
};

const getBooks = (request, handler) => {
  const { reading, finished, name } = request.query;
  const response = {
    status: 'success',
    data: {
      books: [],
    },
  };

  if (reading) {
    const books = bookModel.getByReading(reading === '1');

    response.data.books = books.map((item) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      };
    });

    return handler.response(response).code(200);
  }

  if (finished) {
    const books = bookModel.getByFinished(finished === '1');

    response.data.books = books.map((item) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      };
    });

    return handler.response(response).code(200);
  }

  if (name) {
    const books = bookModel.getByName(name);

    response.data.books = books.map((item) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      };
    });

    return handler.response(response).code(200);
  }

  const books = bookModel.all();

  if (books.length > 0) {
    response.data.books = books.map((item) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      };
    });
  }

  return handler.response(response).code(200);
};

const getBook = (request, handler) => {
  const response = {
    status: 'success',
  };

  const book = bookModel.getByID(request.params.id);

  if (!book) {
    response.status = 'fail';
    response.message = 'Buku tidak ditemukan';
    return handler.response(response).code(404);
  }

  response.status = 'success';
  response.data = { book };

  return handler.response(response).code(200);
};

const updateBook = (request, handler) => {
  const response = {
    status: 'success',
    message: 'Buku berhasil diperbarui',
  };
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name || !author || readPage > pageCount) {
    response.status = 'fail';
    response.message = readPage > pageCount ? 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' : !name ? 'Gagal memperbarui buku. Mohon isi nama buku' : 'Gagal memperbarui buku. Mohon isi author buku';
    return handler.response(response).code(400);
  }

  const payload = {
    name,
    year: year ? year : '1992',
    author: author ? author : '',
    summary: summary ? summary : '',
    publisher: publisher ? publisher : '',
    pageCount: pageCount ? pageCount : 0,
    readPage: readPage ? readPage : 0,
    finished: pageCount === readPage ? true : false,
    reading: reading != undefined ? reading : false,
    updatedAt: new Date().toISOString(),
  };

  const updatedBook = bookModel.update(request.params.id, payload);

  if (!updatedBook) {
    response.status = 'fail';
    response.message = 'Gagal memperbarui buku. Id tidak ditemukan';
    return handler.response(response).code(404);
  }

  return handler.response(response).code(200);
};

const deleteBook = (request, handler) => {
  const id = request.params.id;
  const response = {
    status: 'success',
    message: 'Buku berhasil dihapus',
  };

  const book = bookModel.getByID(id);

  if (!book) {
    response.status = 'fail';
    response.message = 'Buku gagal dihapus. Id tidak ditemukan';
    return handler.response(response).code(404);
  }

  bookModel.delete(id);

  return handler.response(response).code(200);
};

const bookController = {
  create: insertBook,
  books: getBooks,
  book: getBook,
  update: updateBook,
  delete: deleteBook,
};

export default bookController;
