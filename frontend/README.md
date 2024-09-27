WealthSync - Personal Wealth Management Platform
WealthSync is an innovative personal wealth management platform designed to help users track their net worth by consolidating various asset types such as cryptocurrencies, stocks, real estate, and more. With an integrated dashboard providing real-time updates for market-based assets and seamless manual entry for custom assets, WealthSync offers a comprehensive view of financial health and performance.

🚀 Project Vision
WealthSync aims to simplify wealth management by providing users with a unified view of their financial situation. By consolidating various asset classes and liabilities, along with real-time price tracking, the platform empowers users to make informed financial decisions, set and achieve investment goals, and track net worth—all from a single dashboard.

🏗️ Key Features
🔐 Secure User Authentication & Authorization
User registration and login, with robust security protocols.
Password encryption using BCrypt to ensure user data remains secure.
JWT-based authentication for secure API access (can be modified for session-based authentication).

💼 Comprehensive Asset Management
Asset Tracking: Add, update, and delete assets across various categories such as cryptocurrency, stocks, real estate, and collectibles.
Categorization: Assets are grouped and displayed by type for better organization and tracking.
Real-Time Data Integration: Live price tracking for cryptocurrencies and stocks using external APIs.

💳 Debt Management
Track liabilities such as loans, mortgages, and credit card debt.
Calculate net worth in real-time by subtracting total liabilities from assets.

📊 Net Worth Dashboard
Consolidated view of total net worth with visual breakdowns by asset and liability categories.
Dynamic charts and graphs for easy visualization of financial health.

🎯 Investment Goal Tracker
Set and track custom investment goals.
Visual progress indicators to help users monitor their path towards financial milestones.

🌐 Real-Time Market Data Integration
Cryptocurrency Prices: Integrated with CoinGecko API to fetch live prices of digital assets.
Stock Market Prices: Integrated with Alpha Vantage API to pull real-time stock data.

🎨 Intuitive, Responsive Front-End
Built with React for a seamless user experience.
Styled with Tailwind CSS for a modern and responsive UI, ensuring compatibility across devices.

🔧 Full-Stack Integration & RESTful API
RESTful API built using Spring Boot, providing CRUD functionality for assets, debts, and user profiles.
Persistent data storage using MySQL, with a focus on data integrity and security.

🔧 Tech Stack

Backend:
Java Spring Boot 3.3.3: Backend framework for building microservices and RESTful APIs.
Spring Data JPA: Simplifies database interaction.
Spring Security: Manages authentication and authorization.
MySQL: Relational database for storing user, asset, and debt information.
Frontend:
React: JavaScript library for building dynamic user interfaces.
React Hooks: State and side effect management in functional components.
Tailwind CSS: Utility-first CSS framework for responsive design.
APIs:
CoinGecko: Real-time cryptocurrency market data.
Alpha Vantage: Real-time stock market data.

💻 Installation & Setup
Prerequisites
Java 17 or higher.
Node.js and npm for front-end development.
MySQL database server.
Backend Setup
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/wealthsync.git
cd wealthsync/backend
Configure the MySQL database in application.properties:
properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/wealthsync
spring.datasource.username=root
spring.datasource.password=yourpassword
Build and run the Spring Boot application:
bash
Copy code
./mvnw spring-boot:run
Frontend Setup
Navigate to the front-end directory:
bash
Copy code
cd ../frontend
Install dependencies:
bash
Copy code
npm install
Start the React application:
bash
Copy code
npm start
🔄 How to Use WealthSync
Register a new user account.
Log in with your credentials.
Navigate to the Dashboard to:
View consolidated net worth.
Add, update, or delete various assets and liabilities.
Set and track investment goals.
Monitor real-time asset performance with live price updates.
🛠️ Contributing
We welcome contributions from the community! If you'd like to contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Submit a pull request!
For more information, see our contributing guidelines.