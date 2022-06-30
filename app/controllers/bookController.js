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
    year: year ? year : null,
    author: author ? author : null,
    summary: summary ? summary : null,
    publisher: publisher ? publisher : null,
    pageCount: pageCount ? pageCount : null,
    readPage: readPage ? readPage : null,
    finished: pageCount === readPage ? true : false,
    reading: reading ? reading : null,
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

const getBooks = (_request, handler) => {
  const response = {
    status: 'success',
    data: {
      books: [],
    },
  };
  const books = bookModel.all();

  if (books.length > 0) {
    response.data.books = books.map((book) => {
      return { id: book.id, name: book.name, publisher: book.publisher };
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

const bookController = {
  create: insertBook,
  books: getBooks,
  book: getBook,
};

export default bookController;
