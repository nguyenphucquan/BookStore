package com.example.demo.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.Book;

public class BookDao {
	private String jdbcURL = "jdbc:mysql://localhost:3306/jdbc_demo";
	private String name = "root";
	private String pass = "123456789";

	private static final String SELECT_ALL_BOOKS = "select *from book";
	private static final String SELECT_Search_BOOKS ="SELECT * FROM book WHERE title LIKE ? and author LIKE ? ";
	private static final String SELECT_BOOK_BY_ID = "select *from book where bookcode=?";
	private static final String INSERT_BOOKS_SQL = "INSERT INTO book(title,author,category,approved) VALUES (?, ?, ?, ?)";
	private static final String UPDATE_BOOKS_SQL = "UPDATE book SET title=?, author=?, category=?, approved=? WHERE bookcode=?";
	private static final String DELETE_BOOKS_SQL = "DELETE FROM book WHERE bookcode = ?";

	public BookDao() {
	}

	protected Connection getConnection() {

		Connection connection = null;

		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection(jdbcURL, name, pass);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return connection;
	}

	public List<Book> selectAllBooks() {

		List<Book> books = new ArrayList<Book>();

		try (Connection connection = getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL_BOOKS);) {
			ResultSet rs = preparedStatement.executeQuery();
			while (rs.next()) {
				int bookcode = rs.getInt("bookcode");
				String title = rs.getString("title");
				String author = rs.getString("author");
				String category = rs.getString("category");
				int approved = rs.getInt("approved");

				books.add(new Book(bookcode, title, author, category, approved == 0 ? false : true));
			}
		} catch (SQLException e) {

			e.printStackTrace();
		}
		return books;
	}

	public List<Book> searchBooks(String searchTerm) {
	    List<Book> books = new ArrayList<Book>();
	    try (Connection connection = getConnection();
	            PreparedStatement preparedStatement = connection.prepareStatement(SELECT_Search_BOOKS);) {
	        preparedStatement.setString(1, "%" + searchTerm + "%");
	        preparedStatement.setString(2, "%" + searchTerm + "%");
	        ResultSet rs = preparedStatement.executeQuery();
	        while (rs.next()) {
	            int bookcode = rs.getInt("bookcode");
	            String title = rs.getString("title");
	            String author = rs.getString("author");
	            String category = rs.getString("category");
	            int approved = rs.getInt("approved");
	            books.add(new Book(bookcode, title, author, category, approved == 0 ? false : true));
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return books;
	}

	public Book selectBook(int bookcode) {
		Book book = new Book();
		try (Connection connection = getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_BOOK_BY_ID);) {
			preparedStatement.setInt(1, Integer.valueOf(bookcode));
			ResultSet rs = preparedStatement.executeQuery();
			while (rs.next()) {
				book.setBookcode(rs.getInt("bookcode"));
				book.setTitle(rs.getString("title"));
				book.setAuthor(rs.getString("author"));
				book.setCategory(rs.getString("category"));
				book.setApproved(rs.getInt("approved") != 0 ? true : false);
			}
		} catch (SQLException e) {

			e.printStackTrace();
		}
		return book;
	}

	public void insertBook(Book book) {
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(INSERT_BOOKS_SQL);) {
			ps.setString(1, book.getTitle());
			ps.setString(2, book.getAuthor());
			ps.setString(3, book.getCategory());
			ps.setInt(4, book.isApproved() ? 1 : 0);
			ps.executeUpdate();
			ps.close();
			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}
	}

	public void updateBook(Book book) {
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(UPDATE_BOOKS_SQL);) {
			ps.setString(1, book.getTitle());
			ps.setString(2, book.getAuthor());
			ps.setString(3, book.getCategory());
			ps.setInt(4, book.isApproved() ? 1 : 0);
			ps.setInt(5, Integer.valueOf(book.getBookcode()));
			ps.executeUpdate();
			ps.close();
			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}
	}

	public void deleteBook(int bookcode) {
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(DELETE_BOOKS_SQL);) {
			ps.setInt(1, bookcode);
			ps.executeUpdate();
			ps.close();
			connection.close();

		} catch (SQLException e) {

			e.printStackTrace();
		}
	}
}
