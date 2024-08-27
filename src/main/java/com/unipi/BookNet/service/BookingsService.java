package com.unipi.BookNet.service;

import com.unipi.BookNet.controller.secondaryClasses.AddBookingRequest;
import com.unipi.BookNet.exception.NoEntryWithIdException;
import com.unipi.BookNet.model.Book;
import com.unipi.BookNet.model.Bookings;
import com.unipi.BookNet.model.secondary.BookingInfo;
import com.unipi.BookNet.model.secondary.BookStatus;
import com.unipi.BookNet.model.secondary.BookingStatus;
import com.unipi.BookNet.repository.BookingsRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingsService {

    private final BookingsRepository bookingsRepository;
    private final UsersService usersService;
    private final BookService bookService;

    public Bookings createBooking(AddBookingRequest bookingRequest) {
        Bookings booking=new Bookings(usersService.getUserByEmail(bookingRequest.getUserEmail()).get(),bookService.getBookById(bookingRequest.getBookid()).get(), LocalDateTime.now(), BookingStatus.BOOKED, bookingRequest.getFirstName(), bookingRequest.getLastName(), bookingRequest.getTelephone());
        bookService.changeBookStatus(BookStatus.RENTED, booking.getBook().getId());
        return bookingsRepository.save(booking);
    }



    public void giveBook( Long bookingid) {
        Bookings booking = bookingsRepository.findById(bookingid).orElseThrow(() -> new NoEntryWithIdException(
                "booking with id "+bookingid+ " does not exist"
        ));
        booking.setStatus(BookingStatus.RECIEVED);
        bookingsRepository.save(booking);
    }

    public void returnBook( Long bookingid) {
        Bookings booking = bookingsRepository.findById(bookingid).orElseThrow(() -> new NoEntryWithIdException(
                "book with id "+bookingid+ " does not exist"
        ));
        booking.setStatus(BookingStatus.RETURNED);
        bookService.changeBookStatus(BookStatus.AVAILABLE,booking.getBook().getId());
        bookingsRepository.save(booking);
    }



    public List<Bookings> getAllBookings() {
        List<Bookings> bookingsList = bookingsRepository.findAll();
        return bookingsList;
    }

    public List<Bookings> getBookingByBookId(Long id) {
        List<Bookings> booking = bookingsRepository.findAllBybookId(id);
        if(booking.isEmpty()){
            throw new EntityNotFoundException("The booking you requested was not found in the database");
        }
        return booking;
    }

    public Bookings getBookingById(Long id) {
        Optional<Bookings> optionalBooking = bookingsRepository.findById(id);
        return optionalBooking.orElse(null);
    }

    public boolean deleteBooking(Long id) {
        Optional<Bookings> optionalBooking = bookingsRepository.findById(id);

        if (optionalBooking.isPresent()) {
            bookingsRepository.deleteById(id);
            bookService.changeBookStatus(BookStatus.AVAILABLE, optionalBooking.get().getBook().getId());
            return true;
        } else {
            throw new NoEntryWithIdException("There is no booking with the given id");
        }
    }


    public List<BookingInfo> getBookingByUserId(Long id) {

        return bookingsRepository.findAllByUserId(id);

    }
}
