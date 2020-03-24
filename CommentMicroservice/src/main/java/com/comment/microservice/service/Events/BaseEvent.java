package com.comment.microservice.service.Events;


public class BaseEvent<T> {
    public final T id;

    public BaseEvent(T id) {
        this.id = id;
    }
}
