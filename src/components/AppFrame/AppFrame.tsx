import React, { FC, useState } from 'react';
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
import SchoolIcon from '@mui/icons-material/School';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import styles from './AppFrame.module.scss';

const drawerWidth = 260;

const AppFrame: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(mobileOpen => !mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List sx={{ marginTop: 0.5 }}>
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
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1500,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <div className={styles.headerWrapper}>
              <SchoolIcon />
              <h1 className={styles.title}>English Academy</h1>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="guide/" element={<GuidePage />} />
          <Route path="guide/group:group/page:page" element={<GuidePage key={Date.now()} />} />
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
