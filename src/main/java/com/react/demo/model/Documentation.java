package com.react.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "_documentation")
@Getter
@Setter
public class Documentation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1500)
    private String content;

    @Column(length = 255)
    private String identifier;

    @Column(length = 255)
    private String creatorUuid;

}
