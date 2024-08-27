package com.unipi.BookNet.controller.secondaryClasses;

import lombok.*;

@Getter
@Setter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddBookingRequest  {
    private Long Bookid;
    private String UserEmail;
    private String status;
    private String firstName;
    private String lastName;
    private String telephone;


}
