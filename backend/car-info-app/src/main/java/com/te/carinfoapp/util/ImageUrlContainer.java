package com.te.carinfoapp.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Embeddable
public class ImageUrlContainer {

    private String thumbnailUrl;

    private String imageUrl;
}
