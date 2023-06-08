package com.example.demo.entity;
import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "books")
public class Book {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "nvarchar(255)")
	private String title;

	@Column(columnDefinition = "nvarchar(255)")
	private String author;

	@Column(columnDefinition = "nvarchar(255)")
	private String category;

	@Column(columnDefinition = "nvarchar(2500)")
	private String description;

	@Column
	private Date date;

	private int sold, page;
	
	private double price;
	
	@Column(columnDefinition = "nvarchar(255)")
	private String image;

	@JsonManagedReference
    @OneToMany(mappedBy = "book", cascade = CascadeType.REMOVE,fetch = FetchType.EAGER)
    private List<Comment> comments;



	public Book(Long id, String title, String author, String category, String description, Date date, int sold,
			int page, double price, String image) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.category = category;
		this.description = description;
		this.date = date;
		this.sold = sold;
		this.page = page;
		this.price = price;
		this.image = image;

	}

	public Book() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getSold() {
		return sold;
	}

	public void setSold(int sold) {
		this.sold = sold;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
}