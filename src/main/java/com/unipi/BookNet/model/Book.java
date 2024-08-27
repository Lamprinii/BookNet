package com.unipi.BookNet.model;

import com.unipi.BookNet.model.secondary.BookStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long id;

    private String name;
    private String category;
    private Integer numofpages;
    private LocalDate releaseDate;
    @Column(length=1000000)
    private String description;
    private String author;
    private String agerating;
    private BookStatus status;

    public Book(Long id, String name, String category, Integer numofpages, LocalDate releaseDate, String description,
                String author, String agerating, BookStatus status) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.numofpages = numofpages;
        this.releaseDate = releaseDate;
        this.description = description;
        this.author = author;
        this.agerating = agerating;
        this.status = status;
    }

    public Book() {

    }

    public Book(String name, String category, Integer numofpages, String agerating, String author, String description, LocalDate releaseDate) {
        this.name = name;
        this.category = category;
        this.numofpages = numofpages;
        this.agerating = agerating;
        this.author = author;
        this.description = description;
        this.releaseDate = releaseDate;
        this.status = BookStatus.AVAILABLE;
    }

    public Book(Long id, String name, String category, String agerating, String author, String description, LocalDate releaseDate, Integer numofpages) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.agerating = agerating;
        this.author = author;
        this.description = description;
        this.releaseDate = releaseDate;
        this.numofpages = numofpages;
    }

    public String getTitle() {
        return name;
    }

    public Book(Long id, String name)
{
    this.id = id;
    this.name = name;
}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String genre) {
        this.category = genre;
    }

    public Integer getNumofpages() {
        return numofpages;
    }

    public void setNumofpages(Integer duration) {
        this.numofpages = duration;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String director) {
        this.author = director;
    }


    public String getAgerating() {
        return agerating;
    }

    public void setAgerating(String rating) {
        this.agerating = rating;
    }

    public BookStatus getStatus() {
        return status;
    }

    public void setStatus(BookStatus status) {
        this.status = status;
    }
}
