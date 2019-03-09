import React from 'react';
import { BrowserRouter as Router, Route, Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import Home from './pages/home';
import MenuPage from './menu/menu-page';
import Order from './pages/order';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, Toolbar, Link } from '@material-ui/core';
import { LinkProps } from '@material-ui/core/Link';

const styles = {
  menuItem: {
    marginLeft: '10px',
    marginRight: '10px'
  }
};


interface MenuLinkProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function App(props: any) {
  const { classes } = props;
  const MenuLink = (props: MenuLinkProps) => (
    <Link {...props} component={RouterLink as any} />
  )

  return (
    <div>
      <CssBaseline />

      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h4" color="inherit" className={classes.menuItem}>
                <MenuLink color="inherit" to="/">Back Office</MenuLink>
              </Typography>
              <Typography variant="h6" color="inherit" className={classes.menuItem}>
                <MenuLink color="inherit" to="/menu">Menu</MenuLink>
              </Typography>
              <Typography variant="h6" color="inherit" className={classes.menuItem}>
                <MenuLink color="inherit" to="/order">Order</MenuLink>
              </Typography>
            </Toolbar>
          </AppBar>

          <Route exact path="/" component={Home} />
          <Route path="/menu" component={MenuPage} />
          <Route path="/order" component={Order} />
        </div>
      </Router>
    </div>
  );
}

export default withStyles(styles)(App);
