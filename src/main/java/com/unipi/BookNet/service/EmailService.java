package com.unipi.BookNet.service;

import com.unipi.BookNet.model.Bookings;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.io.File;
import java.time.LocalDateTime;

 @RequiredArgsConstructor
@Service
public class EmailService {

     @Autowired
     private final JavaMailSender javaMailSender;

    public void sendBookingConfirmation(Bookings booking) {
        MimeMessage message = javaMailSender.createMimeMessage();

        try {

            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setTo(booking.getUsers().getEmail());
            helper.setSubject("Booking Confirmation");
            helper.setText("Dear " + booking.getUsers().getFirstName() + ",\nYour booking has been confirmed.\nBooking details:\nBook: "
                    + booking.getBook().getTitle() + "\nBooking Time: " + booking.getBookingTime());

            FileSystemResource file = new FileSystemResource(new File("bookingConfirmation/"+booking.getId()+".pdf"));
            helper.addAttachment("confirmation.pdf", file);


            javaMailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

