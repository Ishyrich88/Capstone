package com.wealthsync.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("users") // Map this entity to the 'users' table in the database
public class User {

    @Id
    private Long id;

    @Column("first_name")  // Map the field to 'first_name' column
    private String firstName;

    @Column("last_name")   // Map the field to 'last_name' column
    private String lastName;

    @Column("email")  // Map the field to 'email' column
    private String email;

    @Column("password")  // Map the field to 'password' column
    private String password;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}





