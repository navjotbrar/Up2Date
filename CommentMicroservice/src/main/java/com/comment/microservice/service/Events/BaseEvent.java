package com.comment.microservice.service.Events;

// The basic event entity used
public class BaseEvent<T> {
    public final T id;

    public BaseEvent(T id) {
        this.id = id;
    }
}
