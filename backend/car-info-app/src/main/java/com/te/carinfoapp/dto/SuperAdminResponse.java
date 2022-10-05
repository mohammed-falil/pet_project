package com.te.carinfoapp.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SuperAdminResponse {
	private boolean error;
	private String message;
	private List<CarDetails> carDetailsWithAdminName;

}
