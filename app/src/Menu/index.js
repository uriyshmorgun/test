import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },

  appbBar: {
    background: '#fff',
    boxShadow: 'none',
    borderBottom: '1px solid #ccc',
    color: '#000',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Samsung Circle
          </Typography>
          <Button color="inherit"><PersonOutlineIcon/></Button>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
