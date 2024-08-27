package com.unipi.BookNet.repository;

import com.unipi.BookNet.model.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {

    @Query("SELECT user FROM Users user WHERE user.email =:email")
    Optional<Users> findUsersByEmail(String email);

    @Transactional
    @Modifying
    @Query("DELETE FROM Users user WHERE user.email = :email")
    void deleteByEmail(@Param("email") String email);

    Optional<Users> findUsersById(Long id);
}
