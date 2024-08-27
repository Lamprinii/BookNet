package com.unipi.BookNet.controller.secondaryClasses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GoogleAuthenticationResponse {

    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("user_email")
    private String email;
    @JsonProperty("image_url")
    private String imageUrl;
    @JsonProperty("isSignUp")
    private boolean isSignUp;
}
