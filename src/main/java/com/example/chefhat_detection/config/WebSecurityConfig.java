package com.example.chefhat_detection.config;

import com.example.chefhat_detection.daos.CustomUserDetailsService;
import com.example.chefhat_detection.utils.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    public CustomUserDetailsService customUserDetailsService(){
        return new CustomUserDetailsService();
    };
    //认证authentication
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService()).passwordEncoder(new PasswordEncoder(){

            @Override
            public String encode(CharSequence rawPassword) {
                return MD5Util.encode((String)rawPassword);
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return encodedPassword.equals(MD5Util.encode((String)rawPassword));
            }});
    }
    //授权authorization
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.headers().frameOptions().disable();
        http.formLogin().loginPage("/login").permitAll().defaultSuccessUrl("/",true);
        http.authorizeRequests().antMatchers("/login","/css/**","/fonts/**","/img/**","/register/**","/doRegister/**").permitAll()
                                .antMatchers("/**").authenticated();
        http.csrf().disable();
    }
}
