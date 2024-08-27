package com.unipi.BookNet.controller.oauth2;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.unipi.BookNet.config.JwtService;
import com.unipi.BookNet.config.OAuth2;
import com.unipi.BookNet.controller.secondaryClasses.GoogleAuthenticationResponse;
import com.unipi.BookNet.model.Role;
import com.unipi.BookNet.model.Users;
import com.unipi.BookNet.model.secondary.Provider;
import com.unipi.BookNet.repository.UsersRepository;
import com.unipi.BookNet.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/oauth2/")
public class OAuth2GoogleController {

    private final OAuth2AuthorizedClientService clientService;
    private final OAuth2 oauth2;
    private final UsersRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;



    @GetMapping("/code/google")
    public ResponseEntity<GoogleAuthenticationResponse> loginSuccess(@RequestParam("code") String authorizationCode) {
        System.out.println("Authentication code: " + authorizationCode);
        // Get the ClientRegistration for Google
        ClientRegistration clientRegistration = oauth2.getGoogleClientRegistration();
        GoogleIdToken idToken = null;

        String firstName = "";
        String lastName = "";
        String pictureUrl = null;
        Users user;

        //If the user is correctly authenticated with the authentication code then it proceeds.
        try {
            GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(
                    new NetHttpTransport(),
                    new GsonFactory(),
                    clientRegistration.getClientId(),
                    clientRegistration.getClientSecret(),
                    authorizationCode,
                    clientRegistration.getRedirectUri()
            ).execute();

            // Verify the ID token to get user information
            String idTokenString = tokenResponse.getIdToken();

            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(),
                    new GsonFactory())
                    .setAudience(Collections.singletonList(clientRegistration.getClientId()))
                    .build();

            idToken = verifier.verify(idTokenString);

        } catch (IOException e) {
            //Authentication Failed
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (GeneralSecurityException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String jwtToken;
        String refreshToken;
        String email;
        boolean isSignUp = false;
        if (idToken != null) {
            System.out.println("idToken: " + idToken);

            GoogleIdToken.Payload payload = idToken.getPayload();
            email = payload.getEmail();
            System.out.println("email: " + email);

            if (payload.containsKey("given_name")) {
                firstName = (String) payload.get("given_name");
            }
            if (payload.containsKey("family_name")) {
                lastName = (String) payload.get("family_name");
            }
            if (payload.containsKey("picture")) {
                pictureUrl = (String) payload.get("picture");
            }

            if (userRepository.findUsersByEmail(email).isEmpty()) {
                user = new Users(firstName, lastName, null, email, Role.USER, Provider.GOOGLE);
                userRepository.save(user);
                isSignUp = true;
            } else {
                user = userRepository.findUsersByEmail(email)
                        .orElseThrow();
            }

            jwtToken = jwtService.generateToken(user);
            refreshToken = jwtService.generateRefreshToken(user);
            authenticationService.revokeAllUserTokens(user);
            authenticationService.saveUserToken(user, jwtToken);


        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(new GoogleAuthenticationResponse(jwtToken, refreshToken, email,pictureUrl,isSignUp));
    }




}
