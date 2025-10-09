# Social Media Application

A full-stack social media application built with React and MySQL, featuring user authentication, posts, comments, likes, and real-time interactions.

## 🚀 Features

- **User Authentication** - Secure registration and login with bcrypt password hashing
- **User Profiles** - Personalized user profiles with customizable information
- **Posts** - Create, view, and manage social media posts
- **Comments** - Comment on posts and engage with other users
- **Likes** - Like and unlike posts
- **Stories** - Share temporary stories with followers
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Mobile-friendly interface with SCSS styling
- **Protected Routes** - Secure pages that require authentication

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **React Router DOM v6** - Client-side routing
- **SCSS/Sass** - Styling
- **Material-UI** - UI components and icons
- **Context API** - State management (Auth & Dark Mode)

### Backend

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MySQL 2** - Database
- **bcryptjs** - Password hashing
- **ES6 Modules** - Modern JavaScript syntax

## 📁 Project Structure

```
socialapp/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/        # Images and static files
│   │   ├── components/    # Reusable components
│   │   │   ├── comments/
│   │   │   ├── leftBar/
│   │   │   ├── navbar/
│   │   │   ├── post/
│   │   │   ├── posts/
│   │   │   ├── rightBar/
│   │   │   ├── share/
│   │   │   └── stories/
│   │   ├── context/       # React Context providers
│   │   │   ├── authContext.js
│   │   │   └── darkModeContext.js
│   │   ├── pages/         # Page components
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── profile/
│   │   │   └── register/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── style.scss
│   └── package.json
│
└── server/                # Express backend
    ├── controllers/       # Business logic
    │   ├── auth.js
    │   ├── comment.js
    │   ├── like.js
    │   ├── post.js
    │   └── user.js
    ├── routes/           # API routes
    │   ├── auth.js
    │   ├── comments.js
    │   ├── likes.js
    │   ├── posts.js
    │   └── users.js
    ├── connect.js        # Database connection
    ├── index.js          # Server entry point
    └── package.json
```

## 🔧 Installation

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or Yarn

### 1. Clone the Repository

```bash
git clone https://github.com/Avi2014/socialapp.git
cd socialapp
```

### 2. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE social;
```

Create a MySQL user with proper authentication:

```sql
CREATE USER 'socialapp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
GRANT ALL PRIVILEGES ON social.* TO 'socialapp'@'localhost';
FLUSH PRIVILEGES;
```

Or use the root user with updated authentication:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

Create the necessary tables:

```sql
USE social;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  coverPic VARCHAR(255),
  profilePic VARCHAR(255),
  city VARCHAR(100),
  website VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `desc` TEXT,
  img VARCHAR(255),
  userId INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `desc` TEXT NOT NULL,
  userId INT NOT NULL,
  postId INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  postId INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
  UNIQUE KEY unique_like (userId, postId)
);
```

### 3. Backend Setup

```bash
cd server

# Install dependencies (using npm)
npm install

# OR using Yarn
yarn install
```

Configure the database connection in `server/connect.js`:

```javascript
export const db = mysql.createConnection({
  host: "localhost",
  user: "root", // or 'socialapp'
  password: "your_password",
  database: "social",
});
```

Start the server:

```bash
npm start
# OR
yarn start
```

The server will run on `http://localhost:8800`

### 4. Frontend Setup

```bash
cd client

# Install dependencies (using npm)
npm install

# OR using Yarn
yarn install
```

Start the React app:

```bash
npm start
# OR
yarn start
```

The app will run on `http://localhost:3000`

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users

- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create a new post
- `DELETE /api/posts/:id` - Delete a post

### Comments

- `GET /api/comments?postId=:id` - Get comments for a post
- `POST /api/comments` - Add a comment
- `DELETE /api/comments/:id` - Delete a comment

### Likes

- `GET /api/likes?postId=:id` - Get likes for a post
- `POST /api/likes` - Add a like
- `DELETE /api/likes/:id` - Remove a like

## 🧪 Testing with Postman

Example request to register a user:

```
POST http://localhost:8800/api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

## 🎨 Features in Detail

### Authentication Context

- Manages user login state across the application
- Provides `currentUser` data to all components
- Handles protected routes

### Dark Mode Context

- Toggles between light and dark themes
- Persists theme preference
- Updates UI colors dynamically

### Components

- **Navbar** - Top navigation with user menu
- **LeftBar** - Left sidebar with navigation links
- **RightBar** - Right sidebar with suggestions and activities
- **Posts** - Feed of all user posts
- **Post** - Individual post component with likes and comments
- **Comments** - Comment section for posts
- **Share** - Create new post component
- **Stories** - Stories carousel

## 🐛 Troubleshooting

### MySQL Authentication Error

If you get `ER_NOT_SUPPORTED_AUTH_MODE` or `ER_ACCESS_DENIED_ERROR`:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### Module Not Found Error

Ensure all imports include `.js` extension when using ES6 modules:

```javascript
import { db } from "../connect.js"; // ✅ Correct
import { db } from "../connect"; // ❌ Wrong
```

### Port Already in Use

If port 8800 or 3000 is already in use, change it in:

- Backend: `server/index.js` - `app.listen(8800, ...)`
- Frontend: Create `.env` file with `PORT=3001`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Avi2014**

- GitHub: [@Avi2014](https://github.com/Avi2014)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

⭐ Star this repo if you find it helpful!
