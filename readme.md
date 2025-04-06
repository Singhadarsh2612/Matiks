# HectoClash 🧪⚡

A real-time, math-based duel game built using the **MERN stack** (MongoDB, Express, React, Node.js) with **Redux** for state management. Challenge your friends or compete with players around the world in fast-paced 1v1 math battles!

![HectoClash Landing Page](https://github.com/Singhadarsh2612/Matiks/blob/main/frontend/src/assets/Screenshot%202025-04-06%20at%201.49.20%E2%80%AFPM.png?raw=true)
![Dashboard](https://github.com/Singhadarsh2612/Matiks/blob/main/frontend/src/assets/Screenshot%202025-04-06%20at%201.41.14%E2%80%AFPM.png?raw=true)

---

## 🚀 Features

- **🧠 1v1 Math Battles**: Compete live with friends or random opponents
- **📈 Player Statistics**: Track your wins, losses, and win percentage
- **📜 Game History**: Review your previous matches with timestamps
- **👤 User Profiles**: Personalized dashboard with a star rating system
- **🎮 Multiple Game Modes**:
  - 🎯 **Find a Match** – Play with random players
  - 👥 **Play With Friend** – Private duels using unique match links
  - 🏋️ **Practice Mode** – Sharpen your skills in solo mode
  - 🏆 **Leaderboard** – See where you stand globally!

---

## 🛠️ Tech Stack

### Frontend
- [React.js](https://reactjs.org/) with Hooks
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Bootstrap 5](https://getbootstrap.com/) for responsive UI
- [Socket.IO](https://socket.io/) for real-time gameplay

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with Mongoose
- [JWT](https://jwt.io/) for authentication
- RESTful API design

### DevOps
- Local development setup
- Ready for deployment on platforms like **Render**, **Vercel**, or **Heroku**

---

## 🧑‍💻 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/hectoclash.git
cd hectoclash
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `/backend` directory with the following:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 4. Run the App

In one terminal (backend):
```bash
cd backend
npm start
```

In another terminal (frontend):
```bash
cd frontend
npm start
```

---

## 🎮 Gameplay Mechanics

- Players are given math problems simultaneously
- First to solve correctly gains more points
- Stars reflect player performance and streaks
- Win streaks give bonus multipliers
- Player history and match stats are stored and visualized

---

## 🛿️ Future Roadmap

- 🏁 Tournament Mode
- 🔮 Power-ups and Special Abilities
- 📱 Mobile App (React Native or Flutter)
- 💬 In-game Chat & Friends System
- 🧠 Advanced Math Problem Generator with Levels

---

## 🤝 Contributing

We welcome contributions from the community!

### To contribute:
- Fork the repository
- Create a new branch (`git checkout -b feature/your-feature`)
- Commit your changes (`git commit -m 'Add your feature'`)
- Push to the branch (`git push origin feature/your-feature`)
- Open a pull request

For major changes, please open an issue first to discuss what you’d like to change.

---

## 🌟 Show Your Support

If you like the project, give it a ⭐ on [GitHub](https://github.com/your-username/hectoclash)!

---

## 🤛🏼 Maintainer

**Adarsh Kumar Singh**  
Feel free to reach out with feedback or suggestions!
