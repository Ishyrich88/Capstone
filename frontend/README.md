# WealthSync - Personal Wealth Management Application

WealthSync is a personal wealth management platform that helps users track their total net worth by consolidating various asset types, including cryptocurrency, stocks, watches, and real estate. The platform provides real-time updates for certain assets using APIs (CoinGecko for crypto and Alpha Vantage for stocks) and manual entry for other assets (e.g., real estate).

## Project Goal
The goal of the project is to provide a consolidated dashboard for users to view and manage their total net worth, offering a comprehensive and user-friendly interface for personal wealth management.

## Features
- **User Registration & Authentication**: Secure user registration and login.
- **Password Encryption**: Secure passwords using BCrypt hashing.
- **JWT Authentication**: User login with token-based authentication.
- **Asset Management**: Add, update, and delete different types of assets.
- **Real-Time Price Updates**: Track live cryptocurrency and stock prices using APIs.
- **Net Worth Dashboard**: Visual display of total asset value.
- **React Front-End**: User-friendly interface for managing assets and viewing net worth.
- **RESTful API**: Complete backend built with Spring Boot providing full CRUD functionality.
- **MySQL Database**: Persistent data storage with relational database.

## Tech Stack
### Back-End
- **Java Spring Boot 3.3.3**: Framework for building the backend services.
- **Spring Data JDBC**: Simplifies database access.
- **Spring Security**: Provides authentication and authorization.
- **JWT**: Token-based authentication.
- **MySQL**: Relational database for persistent data storage.

### Front-End
- **React**: JavaScript library for building user interfaces.
- **React Hooks**: Manage state and side effects in functional components.
- **CSS (Bootstrap/Tailwind)**: Styling the application.

### Database
- **MySQL**: Relational database management system.

### APIs
- **CoinGecko**: Fetches live cryptocurrency prices.
- **Alpha Vantage**: Fetches live stock prices.

## Installation
### Prerequisites
- **Java 17** or higher
- **Node.js** and **npm**
- **MySQL** database

### Back-End Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/wealthsync.git
    cd wealthsync/backend
    ```
2. Configure the MySQL database in `application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/wealthsync
    spring.datasource.username=root
    spring.datasource.password=yourpassword
    ```
3. Build and run the Spring Boot application:
    ```sh
    ./mvnw spring-boot:run
    ```

### Front-End Setup
1. Navigate to the front-end directory:
    ```sh
    cd ../frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the React application:
    ```sh
    npm start
    ```

## Usage
1. Register a new user account.
2. Log in with your credentials.
3. Add various assets (cryptocurrency, stocks, watches, real estate, etc.).
4. View your consolidated net worth on the dashboard.
5. Update or delete assets as needed.

## Contributing
We welcome contributions! Please fork the repository and submit pull requests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries or issues, please contact [yourname@domain.com](mailto:yourname@domain.com).
