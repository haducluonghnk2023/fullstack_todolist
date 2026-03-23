package com.example.be_demo_angular.model.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseWrapper<T> {
    private int code;
    private String status;
    private T data;
}