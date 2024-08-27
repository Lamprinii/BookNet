package com.unipi.BookNet;

import com.unipi.BookNet.controller.secondaryClasses.RegisterRequest;
import com.unipi.BookNet.model.*;
import com.unipi.BookNet.model.secondary.BookStatus;
import com.unipi.BookNet.model.secondary.Provider;
import com.unipi.BookNet.repository.*;
import com.unipi.BookNet.service.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@EnableRetry
public class BookNetAppilcation {


	private PasswordEncoder passwordEncoder;



	public static void main(String[] args) {
		SpringApplication.run(BookNetAppilcation.class, args);
	}

	@Bean
	CommandLineRunner run (BookRepository bookRepository, UsersRepository usersRepository,
						   BookingsRepository bookingsRepository, AuthenticationService authenticationService) {
		return args ->{
			//PdfGeneration pdf=new PdfGeneration();
			//pdf.generate(1);
			bookRepository.save(new Book(3L,"Το Μαγικό Ζαχαροπλαστείο","Παιδικό",310, LocalDate.now(),"Η οικογένεια της Ρόσμαρι Μπλις έχει ένα μυστικό: τον Τσελεμεντέ των Μπλις, ένα αρχαίο δερματόδετο βιβλίο με συνταγές για Αντιστροφόπιτα, Κανονικόταρτα με Βατόμουρα και ένα σωρό μαγικά γλυκά. Όταν οι γονείς τους φεύγουν για ταξίδι, η Ρόσμαρι και τα αδέρφια της υπόσχονται να κρατήσουν κλειδωμένο τον Τσελεμεντέ αλλά τα πράγματα αλλάζουν μόλις κάνει την εμφάνισή της μια παράξενη ξένη. Η «θεία Λίλι» καβαλάει μοτοσικλέτα, φοράει μοβ ρούχα με πούλιες και φτιάχνει τα πιο εξωτικά και νόστιμα φαγητά. Μπροστά τους οι δικές τους συνταγές φαίνονται τόσο μα τόσο βαρετές! Έτσι αποφασίζουν να δοκιμάσουν τον Τσελεμεντέ. Τι κακό μπορούν να κάνουν μερικά Αληθομπισκότα ή Αγαποκεκάκια; Κι όμως... Μια ξεκαρδιστική ιστορία παπασπαλισμένη με ζάχαρη και μπόλικη μαγεία.","Littlewood Kathryn","9 - 12, 12 - 17", BookStatus.AVAILABLE));
			bookRepository.save(new Book(3L,"Harry Potter και η κάμερα με τα μυστικά","Παιδικό",358, LocalDate.now(),"Ο ΧΑΡΙ ΞΑΝΑΧΤΥΠΑ! Το καλοκαίρι πέρασε και μαζί και οι βαρετές διακοπές με τους θείους. Ο Χάρι επιστρέφει στη Σχολή Χόγκουαρτς και ξαναβρίσκει τους φίλους του, τον Ρον και την Ερμιόνη. Όμως κάτι παράξενο και επικίνδυνο συμβαίνει. Ο Χάρι ακούει φωνές που τον απειλούν και οι συμμαθητές του δεν ξέρουν από πού να φυλαχτούν. Στον τοίχο εμφανίζεται μια μυστηριώδης επιγραφή: «Η κάμαρα με τα μυστικά άνοιξε. Φυλαχτείτε!»\n" +
					"\n" +
					"Ποιος κρύβεται πίσω από όλα αυτά; Ποιον φοβερό εχθρό πρέπει να αντιμετωπίσει και πάλι ο Χάρι; Θα καταφέρει να σώσει τον εαυτό του και τους φίλους του;\n" +
					"\n" +
					"Η νεαρή Αγγλίδα συγγραφέας μας χαρίζει το δεύτερο συναρπαστικό βιβλίο της σειράς των περιπετειών του Χάρι Πότερ, ένα βιβλίο πρωτότυπο, απολαυστικό, αστείο και διασκεδαστικό, ένα βιβλίο αλλιώτικο από τ' άλλα.","J. K. Rowling ","9 - 12, 12 - 17", BookStatus.AVAILABLE));



			var admin = RegisterRequest.builder()
					.firstName("Admin")
					.lastName("Admin")
					.email("cineticketbooking@gmail.com")
					.password("12345")
					.role(Role.ADMIN)
					.build();

			System.out.println("Admin token: " + authenticationService.register(admin).getAccessToken());
			usersRepository.save(new Users("Giwrgos","Gewrgiou","$2a$10$1b2k0DuAPefZPXkPdeKRFuOBuXV5VQkWmLXZYaFLfiWPh615fBfuO","g.gewrgiou@gmails.com", Role.ADMIN, Provider.LOCAL));
			usersRepository.save(new Users("Nikolaos","Partsanakis","$2a$10$1b2k0DuAPefZPXkPdeKRFuOBuXV5VQkWmLXZYaFLfiWPh615fBfuO","cineticketbooking@gmails.com",Role.USER,Provider.LOCAL));
			LocalDateTime localDateTime1 =LocalDateTime.of(2024, 4, 18, 18, 0, 0, 0);
			LocalDateTime localDateTime2 =LocalDateTime.of(2024, 4, 19, 18, 0, 0, 0);
			LocalDateTime localDateTime3 =LocalDateTime.of(2024, 4, 20, 18, 0, 0, 0);
			//bookingsRepository.save(new Bookings(usersRepository.findById(Long.valueOf(1)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),bookRepository.findById(Long.valueOf(1)).orElseThrow(()->new IllegalArgumentException("The User does not exist")),LocalDateTime.now(), BookStatus.AVAILABLE, "Konstantinos", "Perrakis", "6969696969"));
			LocalDateTime.now();

		};
	}

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList(
				"http://localhost:3000",
				"https://accounts.google.com",
				"https://www.googleapis.com"
				)
		);
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}








}
