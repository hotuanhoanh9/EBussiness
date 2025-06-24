package com.uit.new_recycle.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    private Integer soldNumber;

    private String imagePath;

    private Integer salePercent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getSoldNumber() {
        return soldNumber;
    }

    public void setSoldNumber(Integer soldNumber) {
        this.soldNumber = soldNumber;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Integer getSalePercent() {
        return salePercent;
    }

    public void setSalePercent(Integer salePercent) {
        this.salePercent = salePercent;
    }
}
