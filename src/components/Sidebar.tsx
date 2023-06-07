import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton, Toolbar, useMediaQuery, ClickAwayListener } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { blue } from '@mui/material/colors';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <>
        {open || !isMobile 
          ? (
          <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            sx={{
              width: 250,
            }}
            open={open}
          >
            <List>
              <ListItem
                button
                component={Link}
                to="/"
                sx={{
                  color: location.pathname === '/' ? blue[900] : 'inherit',
                  backgroundColor: location.pathname === '/' ? blue[100] : 'inherit',
                }}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary="Про нас" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/stats"
                sx={{
                  color: location.pathname === '/stats' ? blue[900] : 'inherit',
                  backgroundColor: location.pathname === '/stats' ? blue[100] : 'inherit',
                }}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary="Глобальна статистика" />
              </ListItem>
            </List>
          </Drawer>
        ) : (
          <Toolbar>
            <IconButton color="inherit" aria-label="menu" onClick={() => setOpen(!open)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        )}
      </>
    </ClickAwayListener>
  );
};

export default Sidebar;
