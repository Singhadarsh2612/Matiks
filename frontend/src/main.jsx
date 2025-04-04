import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import GameLobby from './screens/GameLobby.jsx';
import GameHistory from './screens/GameHistory.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// Import new screen components
import DashboardScreen from './pages/DashboardScreen.jsx';
import FindMatchScreen from './pages/FindMatchScreen.jsx';
import PracticeScreen from './pages/PracticeScreen.jsx';
import PlayWithFriendScreen from './pages/PlayWithFriendScreen.jsx';
import LeaderboardScreen from './pages/LeaderboardScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/game-lobby' element={<GameLobby />} />
        <Route path='/game-history' element={<GameHistory />} />
        
        {/* New routes for sidebar navigation */}
        <Route path='/dashboard' element={<DashboardScreen />} />
        <Route path='/find-match' element={<FindMatchScreen />} />
        <Route path='/practice' element={<PracticeScreen />} />
        <Route path='/play-with-friend' element={<PlayWithFriendScreen />} />
        <Route path='/leaderboard' element={<LeaderboardScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);