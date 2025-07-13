import Book from '../models/book.model.js';
import ErrorResponse from '../handler/error.response.js';

class BookService { 
  async getAllBooks() {
    return await Book.find();
  }

  async getBookById(id) {
    return await Book.findById(id);
  }

  async createBook(bookData) {
    const book = new Book(bookData);
    return await book.save();
  }
}
export default BookService;
