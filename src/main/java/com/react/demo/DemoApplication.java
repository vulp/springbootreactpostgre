package com.react.demo;

import com.react.demo.model.User;
import com.react.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner initializeUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.findByUsername("hyperadmin").isEmpty()) {
				String encodedPassword = passwordEncoder.encode("changethisforproduction");
				User user = new User("hyperadmin", encodedPassword, "hyperadmin@localhost.local", User.Role.ADMIN);
				userRepository.save(user);
			}

			//this is just for bot testing purpose so actual api token creating is not needed at the begin
			if (userRepository.findByUsername("korneliusvalountoensio").isEmpty()) {
				String encodedPassword = passwordEncoder.encode("changethisforproduction2");
				User user = new User("korneliusvalountoensio", encodedPassword, "korneliusvalountoensio@localhost.local", User.Role.USER);
				userRepository.save(user);
			}
		};
	}
}
