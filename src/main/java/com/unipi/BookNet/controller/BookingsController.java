package com.unipi.BookNet.controller;

import com.unipi.BookNet.exception.IllegalBookingStatusException;
import com.unipi.BookNet.controller.secondaryClasses.AddBookingRequest;
import com.unipi.BookNet.exception.NoEntryWithIdException;
import com.unipi.BookNet.model.Book;
import com.unipi.BookNet.model.PdfGeneration;
import com.unipi.BookNet.model.secondary.BookingInfo;
import com.unipi.BookNet.service.EmailService;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.web.bind.annotation.*;
import com.unipi.BookNet.model.Bookings;
import com.unipi.BookNet.service.BookingsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bookings")
public class BookingsController {
    private final BookingsService bookingsService;
    private final EmailService emailService;


    @Autowired
    public BookingsController(BookingsService bookingsService,EmailService emailService) {
        this.bookingsService = bookingsService;
        this.emailService = emailService;
    }

    @GetMapping("/all")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public ResponseEntity<List<Bookings>> getAllBookings() {

        List<Bookings> bookings = bookingsService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);

        //Exception
    }

    @GetMapping(path="/book/{id}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public  ResponseEntity<List<Bookings>> getBookingByBookId(@PathVariable("id") Long id){

            List<Bookings> bookings=bookingsService.getBookingByBookId(id);
            return new ResponseEntity<>(bookings,HttpStatus.OK);

        //Exception
    }
    @GetMapping("/{id}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public ResponseEntity<Bookings> getBookingById(@PathVariable Long id) {

            Bookings booking = bookingsService.getBookingById(id);
            if (booking != null) {
                return new ResponseEntity<>(booking, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        //Exception
    }

    @PostMapping("/create")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public ResponseEntity<Bookings> createBooking(@RequestBody AddBookingRequest bookingrequest) {

            Bookings createdBooking = bookingsService.createBooking(bookingrequest);
            //PdfGeneration pdf = new PdfGeneration();
            //pdf.generate(createdBooking);
            //emailService.sendBookingConfirmation(createdBooking);
            return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
        //Exception
    }

    @DeleteMapping("/delete/{id}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000), noRetryFor = NoEntryWithIdException.class)
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {

            bookingsService.deleteBooking(id);

            return new ResponseEntity<>("Successfully Deleted",HttpStatus.OK);
            //NoEntryWithIdException
            //Exception
    }

    @GetMapping("/user/{id}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000), noRetryFor = IllegalArgumentException.class)
    public ResponseEntity<List<BookingInfo>> getBookingsByUserId(@PathVariable Long id) {

            return new ResponseEntity<>(bookingsService.getBookingByUserId(id), HttpStatus.OK);
       //IllegalArgumentException
        //Exception
    }
    @Recover
    public ResponseEntity<Bookings> Recover(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping(path = "/give/{id}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000), noRetryFor = NoEntryWithIdException.class)
    public ResponseEntity<String> giveBook(@PathVariable("id") Long id) {

            bookingsService.giveBook(id);
            return new ResponseEntity<>(HttpStatus.OK);

            //NoEntryWithIdException
        //Exception
    }

    @PutMapping(path = "/get/{id}")
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000), noRetryFor = NoEntryWithIdException.class)
    public ResponseEntity<String> getBook(@PathVariable("id") Long id) {

            bookingsService.returnBook(id);
            return new ResponseEntity<>(HttpStatus.OK);
            //NoEntryWithIdException
        //Exception
    }

}
