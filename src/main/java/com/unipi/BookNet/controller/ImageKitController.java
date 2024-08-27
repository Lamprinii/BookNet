package com.unipi.BookNet.controller;

import com.unipi.BookNet.model.Book;
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.config.Configuration;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Random;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/imagekit")
@NoArgsConstructor

public class ImageKitController {

    @GetMapping
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 1000))
    public Map<String,String> imagekitauth(){
        ImageKit imageKit = ImageKit.getInstance();
        Configuration config = new Configuration("public_RpxufWizWBajeZch607qowKJCrg=", "private_DmlQqdyOyekkM/fI4NSIAT9DNBE=", "https://ik.imagekit.io/cineticketbooking");
        imageKit.setConfig(config);
        long time=(System.currentTimeMillis()/1000L)+1000L;
        System.out.println(time);
        // Map<String,String> authenticationParams = ImageKit.getInstance().getAuthenticationParameters();
        Map<String,String> authenticationParams=imageKit.getAuthenticationParameters(String.valueOf(System.currentTimeMillis()+new Random().nextLong()),time);
        return authenticationParams;
    }
    @Recover
    public ResponseEntity<Book> Recover(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
