# Chatroom App 📢

A real-time chat application built with **React**, **Node.js**, and **Socket.io**. This app supports real-time messaging, user registration/login, and online/offline status tracking. The UI is styled using **Tailwind CSS**, and API documentation is available through **Swagger**.

---

## Features 🚀

- Real-time messaging between users.
- User registration and login system.
- Online/Offline user status indicators.
- Notification for unread messages.
- UI built with **Tailwind CSS**.
- API documentation using **Swagger**.
- Ready for database integration (MongoDB/SQL).

---

## Technologies 🛠

### **Frontend**
- **React** + **TypeScript**
- **React Query** (for state management)
- **Socket.io-client** (for real-time communication)
- **Tailwind CSS** (for styling)

### **Backend**
- **Node.js** + **Express.js**
- **Socket.io** (WebSocket support)
- **Swagger** (API documentation)

### **Other Tools**
- **Yarn** (package manager)
- **ESLint** & **Prettier** (code quality)

---

## Installation & Running the Project ⚙️

### Prerequisites:
- **Node.js** (v14 or higher)
- **Yarn** installed globally
- A code editor (e.g., VS Code)

---

### Steps to Run:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/niloo-maleki/Socket_Talk

2. **For the frontend**:
- cd client
- yarn install
- yarn start

3. **For the backend**:
- cd server
- yarn install
- yarn dev

4. **Swagger API Documentation 📜**:
http://localhost:3002/api-docs

---

## Upcoming Features 🔮

- Integration with MongoDB for data persistence.
- Support for group chats.
- Enhanced error handling and user management.
- Deployment on a cloud service.

---

### Project Structure 📂

```plaintext‍‍

SOCKET_TALK/
├── client/                    # Frontend (React)
│   ├── public/                # Static files
│   ├── src/
│   │   ├── api/               # API call functions
│   │   ├── assets/            # Images, fonts, etc.
│   │   ├── components/        # Shared UI components
│   │   ├── features/          # Page-specific components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── router/            # Routing components
│   │   ├── schema/            # Form validation schemas
│   │   ├── services/          # API services
│   │   ├── socket/            # Socket.IO management
│   │   ├── types/             # TypeScript types/interfaces
│   │   ├── App.tsx            # Main app component
│   │   └── main.tsx           # Application entry point
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json           # Frontend dependencies
│
├── server/                    # Backend (Node.js + Express)
│   ├── data/                  # Static JSON files
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # API controllers
│   │   ├── docs/              # Swagger and API documentation
│   │   ├── events/            # Socket.IO event handlers
│   │   ├── routes/            # API routes
│   │   ├── swagger/           # Swagger configuration files
│   │   ├── types/             # TypeScript types/interfaces
│   │   ├── utils/             # Utility/helper functions
│   │   ├── app.ts             # Application setup
│   │   ├── server.ts          # Main server file
│   │   └── swagger.ts         # Swagger configuration entry
│   ├── nodemon.json           # Nodemon configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json           # Backend dependencies
│
└── shared/                    # Shared files between client and server
    ├── constants/             # Shared constants
    └── types/                 # Shared TypeScript types/interfaces
