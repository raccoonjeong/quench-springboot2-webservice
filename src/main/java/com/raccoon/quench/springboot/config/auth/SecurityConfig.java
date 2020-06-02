package com.raccoon.quench.springboot.config.auth;

import com.raccoon.quench.springboot.domain.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .authorizeRequests()
                .antMatchers("/", "/css/**", "/img/**",
                        "/js/**", "/h2-console/**", "/main", "/profile").permitAll()
                .antMatchers("/api/v1/**").hasRole(Role.GUEST.name())
                .anyRequest().authenticated()
                .and()
                .logout()
                .logoutSuccessUrl("/main")
                .and()
                .oauth2Login()
                .defaultSuccessUrl("/main")
                .userInfoEndpoint()
                .userService(customOAuth2UserService);
    }
}
