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

    private String tinhTrangMay;

    private String accountID;


    public Product() {

    }

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

    public String getTinhTrangMay() {
        return tinhTrangMay;
    }

    public void setTinhTrangMay(String tinhTrangMay) {
        this.tinhTrangMay = tinhTrangMay;
    }

    public String getAccountID() {
        return accountID;
    }

    public void setAccountID(String accountID) {
        this.accountID = accountID;
    }

    public Product(Long id, String name, Double price, Integer soldNumber, String imagePath, Integer salePercent, String tinhTrangMay, String accountID) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.soldNumber = soldNumber;
        this.imagePath = imagePath;
        this.salePercent = salePercent;
        this.tinhTrangMay = tinhTrangMay;
        this.accountID = accountID;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", soldNumber=" + soldNumber +
                ", imagePath='" + imagePath + '\'' +
                ", salePercent=" + salePercent +
                ", tinhTrangMay='" + tinhTrangMay + '\'' +
                ", accountID='" + accountID + '\'' +
                '}';
    }
}
