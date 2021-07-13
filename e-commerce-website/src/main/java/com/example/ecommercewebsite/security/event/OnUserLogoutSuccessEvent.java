package com.example.ecommercewebsite.security.event;

import org.springframework.context.ApplicationEvent;

import java.time.Instant;
import java.util.Date;

public class OnUserLogoutSuccessEvent extends ApplicationEvent {
    private static final long serialVersionUID = 1L;
    private final String userEmail;
    private final String token;
    private final Date eventTime;

    public OnUserLogoutSuccessEvent(String userEmail, String token) {
        super(userEmail);
        this.userEmail = userEmail;
        this.token = token;
        this.eventTime = Date.from(Instant.now());
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getToken() {
        return token;
    }

    public Date getEventTime() {
        return eventTime;
    }
}
