package com.unipi.BookNet.repository;

import com.unipi.BookNet.model.Book;
import com.unipi.BookNet.model.secondary.BookListObject;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {


    @Query("SELECT m FROM Book m WHERE m.name =?1")
    Optional<Book> findBookByName(String name);
    @Transactional
    @Modifying
    @Query("DELETE FROM Book m WHERE m.name = :name")
    void deleteByName(@Param("name") String name);

    boolean existsByName(String name);

    @Query("SELECT new com.unipi.BookNet.model.secondary.BookListObject(m.id, m.name) FROM Book m")
    List<BookListObject> findBooks();



}
