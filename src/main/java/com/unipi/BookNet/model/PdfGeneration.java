package com.unipi.BookNet.model;

import com.google.zxing.WriterException;
import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;

public class PdfGeneration {



    public void generate(Bookings booking) {
        try {
            String name = booking.getFirstName();
            String surname = booking.getLastName();
            String book= booking.getBook().getName();
            String seat=String.valueOf(booking.getSeat());
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream("bookingConfirmation/"+booking.getId() + ".pdf"));
            document.open();
            Image img = Image.getInstance("FrontEnd/book-net-app/src/Components/Images/Logo.png");
            Font header1 = FontFactory.getFont(FontFactory.COURIER, 15, BaseColor.BLACK);
            Font header2 = FontFactory.getFont(FontFactory.COURIER_BOLD, 14, BaseColor.BLACK);
            Font p = FontFactory.getFont(FontFactory.COURIER, 12, BaseColor.BLACK);
            Font warn = FontFactory.getFont(FontFactory.COURIER_BOLD, 12, BaseColor.RED);
            Chunk chunk = new Chunk("Thank You " + name + ", for your Reservation", header1);
            Paragraph paragraph = new Paragraph("Your Reservation Details", header2);
            Paragraph bookingName = new Paragraph("Name : "+ name+" "+surname, p);
            Paragraph bookName = new Paragraph("Book : "+ book, p);
            Paragraph seatPdf = new Paragraph("Seat No. : "+ seat, p);
            Chunk warning = new Chunk("Please, note that your reservation is valid until 30 minutes before the start of the book",warn);
            //warning.setBackground(new BaseColor(204, 204, 204));
            img.scaleAbsoluteHeight(100F);
            img.scaleAbsoluteWidth(200F);
            document.add(img);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(chunk);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(paragraph);
            document.add(Chunk.NEWLINE);
            document.add(bookingName);
            document.add(bookName);
            document.add(seatPdf);
            QRCodeGenerator qr=new QRCodeGenerator();
            byte[] qrcode=qr.getQRCodeImage(booking.getId().toString());
            Image qrcodePrint=Image.getInstance(qrcode);
            qrcodePrint.scaleAbsoluteHeight(200F);
            qrcodePrint.scaleAbsoluteWidth(200F);
            document.add(qrcodePrint);
            document.add(warning);
            document.close();
        } catch (FileNotFoundException | DocumentException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException  e) {
            e.printStackTrace();
        } catch (WriterException e) {
            throw new RuntimeException(e);
        }
    }

}




