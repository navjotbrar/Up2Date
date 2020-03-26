package com.comment.microservice.service.Commands;

//Base class for Axon commands, all specific commands will extend from here

import org.axonframework.modelling.command.TargetAggregateIdentifier;

public class BaseCommand<T> {

    @TargetAggregateIdentifier
    public final T id;

    public BaseCommand(T id){
        this.id = id;
    }
}
