# GIFT SHOP MOBILE APP
_Software Engineer Project_

#

![GitHub repo size](https://img.shields.io/github/repo-size/koitran14/WhiteBoard-Platform)
![GitHub contributors](https://img.shields.io/github/contributors/koitran14/WhiteBoard-Platform)
![GitHub stars](https://img.shields.io/github/stars/koitran14/WhiteBoard-Platform?style=social)
![GitHub forks](https://img.shields.io/github/forks/koitran14/WhiteBoard-Platform?style=social)
![GitHub issues](https://img.shields.io/github/issues/koitran14/WhiteBoard-Platform)

![](/thumbnail.png)


## 📜 Overview
The Gift Shop Mobile App is an innovative platform designed for seamless and secure browsing, customization, ordering, and purchasing of gifts. It offers a user-friendly interface with a focus on customer satisfaction.

## 🎯 Objectives
- Provide a convenient platform for unique gift items.
- Offer seamless shopping with secure payments.
- Enhance customer engagement through personalized recommendations and loyalty programs.
- Drive sales and increase customer satisfaction.

## 🧑‍🤝‍🧑 Team

| Name                                                                 | Role           |
|----------------------------------------------------------------------|----------------|
| [Trần Ngọc Đăng Khôi](https://github.com/koitran14)                  | Project Owner  |
| [Nguyễn Trần Hoàng Hạ](https://github.com/hahoang03)         | Team Member    |
| [Nguyễn Hoàng Gia Ân](https://github.com/annguyen0512)           | Team Member    |
| [Trần Thế Phong](https://github.com/ChaoZiK)                    | Team Member    |
| [Phạm Nguyễn Đăng Khôi](https://github.com/dangkhoi3107)       | Team Member    |
| [Võ Minh Khang](https://github.com/leaser019)                      | Team Member    |
| [Nguyễn Trọng Nguyên](https://github.com/JetBlack219)          | Team Member    |

## ✨ Features
### Functional Requirements
#### 👤 Customers
- Sign-in and registration.
- Profile updates.
- Viewing ratings and reviews.
- Multiple payment methods.
- Order finalization and cancellation before payment.

#### 🛍️ Giftshop Staff
- Profile information updates.
- Category updates and modifications.

#### ⚙️ Operation Team
- User account management.
- Monitoring and analyzing user feedback and data.
- Ensuring high-rated gifts are available for order.

### Non-Functional Requirements
- User-friendly interface with quick and efficient order services.
- Secure payment options.
- High availability and fault tolerance.
- Scalability to handle large order volumes.

## 🛠️ Technologies Used
### 📱 Mobile App (Frontend)
- **Framework:** React Native with Expo CLI
- **State Management:** Redux
- **Navigation:** React Navigation
- **API Requests:** Axios

### 🌐 Server (Backend)
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Mongoose for ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Environment Variables:** dotenv
- **Password Hashing:** bcrypt

## 🏛️ System Architecture
The app uses a client-server architecture with React Native for the frontend and Node.js with Express for the backend. MongoDB is used for data storage, and JWT is used for authentication. Stripe handles secure payment processing.

## ⚙️ Installation and Setup

### Prerequisites
- Node.js
- npm (Node Package Manager)
- Expo CLI
- MongoDB

### Mobile App Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/koitran14/Gift-Shop-Mobile-App.git
   cd Gift-Shop-Mobile-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the app:**
   ```bash
   expo start
   ```

### Server Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/koitran14/Gift-Shop-Mobile-Server.git
   cd Gift-Shop-Mobile-Server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```
   DATABASE_URL='your_mongodb_uri'
   DATABASE_NAME='giftDB'
   SERVER_PORT=3000
   SERVER_IP='<IPv4 Address>'
   JWT_SECRET='giftDelivery'
   ```

4. **Run the server:**
   ```bash
   node index.js
   ```

## 📅 Project Management
The project follows Agile methodology with Scrum. Development is divided into multiple sprints, each focusing on specific features and functionalities. Regular progress evaluations and feedback incorporation ensure continuous improvement.

### 📅 Timeline
1. **Research Phase:** Identify suitable techniques, frameworks, and processes.
2. **Implementation Phase:** Adopt Scrum, divide features into sprints.
3. **Midterm Progress Evaluation:** Provide updates on features and sprints.
4. **Enhancement Phase:** Incorporate feedback for product alignment and efficiency.

## 📋 Sprint Backlog
### 🏃 Sprint 1
- **User Story:** Customers can create a unique gift shop account.
- **Tasks:** UI Building, HomeScreen Backend Debugging, Login + Register Fetching Functionalities.

### 🏃 Sprint 2
- **User Story:** Intuitive and visually appealing homescreen.
- **Tasks:** Homescreen design and functionality, responsiveness, accessibility, performance optimization.

### 🏃 Sprint 3
- **User Story:** Comprehensive shopping experience with user profiles, shopping carts, and shop profiles.
- **Tasks:** Profile Screen, Cart Screen, Shop Profile integration.

## 🚀 Future Improvements
- Further personalization of user experiences.
- Simplification of the checkout process to maintain competitiveness.

## 🙏 Acknowledgements
We thank the entire team for their dedication and hard work throughout the project. Special thanks to our stakeholders for their valuable feedback and support.

---

**Note:** This project was developed as part of the curriculum at the School of Computer Science and Engineering, International University.
