package com.unipi.BookNet.service;

import com.unipi.BookNet.exception.NoEntryWithIdException;
import com.unipi.BookNet.model.Book;
import com.unipi.BookNet.model.secondary.BookListObject;
import com.unipi.BookNet.model.secondary.BookStatus;
import com.unipi.BookNet.repository.BookRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getBooks() { return bookRepository.findAll();
    }

    public Optional<Book>getBookById(Long id) {
        return bookRepository.findById(id);
    }


    public Book addNewBook(Book book) {
        Optional<Book> bookOptional = bookRepository.findBookByName(book.getName());
        if(bookOptional.isPresent()){
            throw new IllegalStateException("Book name already in list");
        }
        book.setStatus(BookStatus.AVAILABLE);
        return bookRepository.save(book);
    }


    public void deleteBook(String name) {
        boolean exists = bookRepository.existsByName(name);
        if(!exists){
            throw new IllegalStateException("Book with name "+name+" does not exist");
        }
        bookRepository.deleteByName(name);
    }
    public void changeBookStatus(BookStatus status, Long bookid) {
        Book book = bookRepository.findById(bookid).orElseThrow(() -> new NoEntryWithIdException(
                "book with id "+bookid+ " does not exist"
        ));
        book.setStatus(status);
        bookRepository.save(book);
    }
    public void deleteBookById(Long id) {
        boolean exists = bookRepository.existsById(id);
        if(!exists){
            throw new IllegalStateException("Book with id "+id+" does not exist");
        }
        bookRepository.deleteById(id);
    }

    @Transactional
    public void updateBook(String bookName, Book newBook) {
        Book book = bookRepository.findBookByName(bookName).orElseThrow(() -> new NoEntryWithIdException(
                "book with name "+bookName+ " does not exist"
        ));

        if(newBook.getCategory() != null && !newBook.getCategory().isBlank()){
            book.setCategory(newBook.getCategory());
        }
        if (newBook.getNumofpages() != null && newBook.getNumofpages() > 0) {
            book.setNumofpages(newBook.getNumofpages());
        }
        if (newBook.getReleaseDate() != null) {
            book.setReleaseDate(newBook.getReleaseDate());
        }
        if (newBook.getDescription() != null && !newBook.getDescription().isBlank()) {
            book.setDescription(newBook.getDescription());
        }
        if (newBook.getAuthor() != null && !newBook.getAuthor().isBlank()) {
            book.setAuthor(newBook.getAuthor());
        }
        if (newBook.getAgerating() != null && !newBook.getAgerating().isBlank()) {
            book.setAgerating(newBook.getAgerating());
        }
    }

    @Transactional
    public void updateBookById(Long Id, Book newBook) {
        Book book = bookRepository.findById(Id).orElseThrow(() -> new NoEntryWithIdException(
                "book with Id "+Id+ " does not exist"
        ));

        if(newBook.getCategory() != null && !newBook.getCategory().isBlank()){
            book.setCategory(newBook.getCategory());
        }
        if (newBook.getNumofpages() != null && newBook.getNumofpages() > 0) {
            book.setNumofpages(newBook.getNumofpages());
        }
        if (newBook.getReleaseDate() != null) {
            book.setReleaseDate(newBook.getReleaseDate());
        }
        if (newBook.getDescription() != null && !newBook.getDescription().isBlank()) {
            book.setDescription(newBook.getDescription());
        }
        if (newBook.getAuthor() != null && !newBook.getAuthor().isBlank()) {
            book.setAuthor(newBook.getAuthor());
        }
        if (newBook.getAgerating() != null && !newBook.getAgerating().isBlank()) {
            book.setAgerating(newBook.getAgerating());
        }
    }

    public List<BookListObject> getBookList()
    {
        return bookRepository.findBooks();
    }
}
