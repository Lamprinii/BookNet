package com.unipi.BookNet.controller;

import com.google.gson.Gson;
import com.unipi.BookNet.exception.NoEntryWithIdException;
import com.unipi.BookNet.model.Book;
import com.unipi.BookNet.model.secondary.BookListObject;
import com.unipi.BookNet.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/books")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping(path = "getAllBooks")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public ResponseEntity<List<Book>> getBooks() throws Exception {

            List<Book> books = bookService.getBooks();
            return new ResponseEntity<>(books, HttpStatus.OK);

    }
    @GetMapping(path = "book/{id}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public ResponseEntity<Optional <Book>> getBookbyid(@PathVariable("id") Long id ) throws Exception {

            System.out.println("TEST  TEST TEST");
            return new ResponseEntity<>(bookService.getBookById(id), HttpStatus.OK);
          //Internal error

    }

    @PostMapping
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public ResponseEntity<Book> addNewBook(@RequestBody Book book) throws Exception {

            Book addedbook= bookService.addNewBook(book);
            return new ResponseEntity<>(addedbook,HttpStatus.CREATED);
        //Internal error

    }

    @DeleteMapping(path = "{name}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000), noRetryFor = NoEntryWithIdException.class)
    public ResponseEntity<String> deleteBook(@PathVariable("name") String name) throws Exception {

        bookService.deleteBook(name);
        return new ResponseEntity<>("Succesfully Deleted Book", HttpStatus.NO_CONTENT);
    //NoEntryWithIdException
            //Internal error

}

    @DeleteMapping(path ="/delete/{id}")
    public ResponseEntity<String> deleteBookById(@PathVariable("id") Long id) throws Exception {

            bookService.deleteBookById(id);
            return new ResponseEntity<>("Successfully Deleted Book ",HttpStatus.OK);
       //NoEntryWithIdException
    }

    @Recover
    public ResponseEntity<Book> Recover(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @PutMapping(path = "{name}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000), noRetryFor = NoEntryWithIdException.class)
    public ResponseEntity<String> updateBook(@PathVariable("name") String name, @RequestBody Book newBook) throws Exception {

            bookService.updateBook(name, newBook);
            return new ResponseEntity<>(HttpStatus.OK);
        //NoEntryWithIdException
        //Internal error

    }

    @PutMapping(path = "/update/{id}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000), noRetryFor = NoEntryWithIdException.class)
    public ResponseEntity<String> updateBook(@PathVariable("id") Long id, @RequestBody Book newBook) throws Exception {

            bookService.updateBookById(id, newBook);
            return new ResponseEntity<>(HttpStatus.OK);
        //NoEntryWithIdException
        //Internal error
    }

    @GetMapping(path = "bookList")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public ResponseEntity<String> getBookList() throws Exception {
        Gson gson = new Gson();
        List<BookListObject> temp = bookService.getBookList();
        String bookList = gson.toJson(temp);

        return new ResponseEntity<>(bookList, HttpStatus.OK);
    }




}
