package com.example.Karnam;



import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.config.Customizer;

@Configuration
public class login{

  @Bean
  public SecurityFilterChain sec(HttpSecurity http){

    http.authorizeHttpRequests((auth)->auth.requestMatchers("/chat").permitAll()
                                           .requestMatchers("/test").permitAll()
                                           .anyRequest().authenticated())
        .csrf((csrf)->csrf.disable())
        .cors(cors->cors.configurationSource(corConfig()))
        .httpBasic(Customizer.withDefaults())
        .formLogin((form)->form.successHandler((req,res,auth)->{

          res.setStatus(200);
          res.getWriter().write("Succcess");

        })
                               .failureHandler((req,res,auth)->{

                                  res.setStatus(401);
                                  res.getWriter().write("Failure");
                               })
            );

    
    return http.build();
  }

  @Bean
  public PasswordEncoder pass(){
    return new BCryptPasswordEncoder();
  }

  @Bean
  public UserDetailsService userConfig(PasswordEncoder encoder){

    UserDetails user=User.builder()
                         .username("Anad")
                         .password(encoder.encode("tt"))
                         .roles("ADMIN")
                         .build();
    
    return new InMemoryUserDetailsManager(user);
  }

  @Bean
  public CorsConfigurationSource corConfig(){

    CorsConfiguration cors= new CorsConfiguration();
    
    cors.setAllowedOrigins(List.of("http://localhost:5173","https://mypc.tail10621d.ts.net","http://localhost:5174","http://localhost:5175"));
    cors.setAllowedHeaders(List.of("*"));
    cors.setAllowedMethods(List.of("*"));
    cors.setAllowCredentials(true);


     UrlBasedCorsConfigurationSource src= new UrlBasedCorsConfigurationSource();
    src.registerCorsConfiguration("/**",cors);

    return src;
  }

  @Component
  public class eventManager{

    @EventListener
    public void success(AuthenticationSuccessEvent event){
      System.out.println(event.getAuthentication().getName()+" successfully login");
    }
    @EventListener
    public void failure(AbstractAuthenticationFailureEvent event){
      System.out.println(event.getAuthentication().getName()+" failed to login");
    }
  }


  


}
