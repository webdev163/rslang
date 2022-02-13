import React, { FC, useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExtensionIcon from '@mui/icons-material/Extension';
import MovingIcon from '@mui/icons-material/Moving';
import MainPage from '../../pages/MainPage';
import LoginPage from '../../pages/LoginPage';
import GuidePage from '../../pages/GuidePage';
import HardWordsPage from '../Guide/HardWordsPage';
import GamesPage from '../../pages/GamesPage';
import StatsPage from '../../pages/StatsPage';
import GameAudio from '../../components/GameAudio';
import GameSprint from '../../components/GameSprint';
import { Routes, Route, Link } from 'react-router-dom';
import LoginListItem from '../LoginButton';

const drawerWidth = 280;

const AppFrame: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            RSLang
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button key="Главная" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Главная" />
            </ListItem>
            <LoginListItem />
            <ListItem
              button
              key="Учебник"
              component={Link}
              to="/guide"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Учебник" />
            </ListItem>
            <ListItem
              button
              key="Мини-игры"
              component={Link}
              to="/games"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText primary="Мини-игры" />
            </ListItem>
            <ListItem
              button
              key="Статистика"
              component={Link}
              to="/stats"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemIcon>
                <MovingIcon />
              </ListItemIcon>
              <ListItemText primary="Статистика" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="guide/" element={<GuidePage />} />
          <Route path="guide/group:group/page:page" element={<GuidePage />} />
          <Route path="guide/hard" element={<HardWordsPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/audio" element={<GameAudio />} />
          <Route path="games/sprint" element={<GameSprint />} />
          <Route path="stats" element={<StatsPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AppFrame;
