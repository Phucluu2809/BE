import SuccessResponse from '../handler/succes.response.js';
import ErrorResponse from '../handler/error.response.js';
import BookService from '../service/book.service.js';

class BookController {
  constructor(bookService) {
    this.bookService = bookService;
  }

  getAllBooks = async (req, res, next) => {
    const books = await this.bookService.getAllBooks();
    SuccessResponse.OK(books, 'Book retrieved successfully').send(res);
  };

  getBookById = async (req, res, next) => {
    const { id } = req.params;
    const book = await this.bookService.getBookById(id);
    if (!book) throw ErrorResponse.NotFound('book not found');
    SuccessResponse.OK(book, 'book retrieved successfully').send(res);
  };

  createBook = async (req, res, next) => {
    const bookData = req.body;
    const newBook = await this.bookService.createBook(bookData);
    SuccessResponse.Created(newBook, 'Poll created successfully').send(res);
  };

}

const bookController = new BookController(new BookService());
export const {
  getAllBooks,
  getBookById,
  createBook,
} = bookController;
