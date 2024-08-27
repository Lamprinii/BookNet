package com.unipi.BookNet.repository;

import com.unipi.BookNet.model.Bookings;
import com.unipi.BookNet.model.secondary.BookingInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {


    List<Bookings> findAllBybookId(Long book);

    @Query("SELECT new com.unipi.BookNet.model.secondary.BookingInfo(b.id, b.book.name," +
            "b.status,b.bookingTime) FROM Bookings b WHERE b.users.id = :user_id")
    List<BookingInfo> findAllByUserId(Long user_id);



}