package com.unipi.BookNet.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.unipi.BookNet.model.secondary.BookStatus;
import com.unipi.BookNet.model.secondary.BookingStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@Table(name = "bookings")
@AllArgsConstructor
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Users.class)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "users_id",referencedColumnName = "users_id",nullable = false)
    private Users users;
    @ManyToOne(targetEntity = Book.class)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name="book_id",referencedColumnName = "book_id",nullable = false)
    private Book book;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
    @Column
    private BookingStatus status;
    @Column
    private int seat;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String telephone;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS][.SS][.S]")
    private LocalDateTime bookingTime; // Εδώ περιέχεται η ώρα της κράτησης με ημερομηνία και ώρα


    public Bookings(Users users, Book book, LocalDateTime bookingTime, BookingStatus status, String firstName, String lastName, String telephone) {
        this.id = id;
        this.users = users;
        this.book = book;
        this.bookingTime = bookingTime;
        this.firstName=firstName;
        this.lastName=lastName;
        this.telephone=telephone;
        this.status=status;
    }

    public Bookings() {

    }

    public Long getId() {
        return id;
    }

    public Users getUsers() {
        return users;
    }

    public Book getBook() {
        return book;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public int getSeat() {
        return seat;
    }

    public void setSeat(int seat) {
        this.seat = seat;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
}
