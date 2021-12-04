import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Cookies from 'universal-cookie';
import ApiUrl from './Constants';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const cookies = new Cookies();

function CoachingMenuEntry(isCoaching) {
  if (isCoaching.isCoaching) {
    return (
      <Link
      variant="button"
      color="text.primary"
      href="/coaching"
      sx={{ my: 1, mx: 1.5 }}
      >
        Coaching
      </Link>
    );
  }

  return null;
}

export default class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        let user = cookies.get('user');
        fetch(ApiUrl + '/clients', {
          "method": "GET",
          "headers": {
              "content-type": "application/json",
              "accept": "application/json"
          }})
          .then(response => response.json())
          .then(response => {
            this.setState({isCoaching: response.some(x => x.coachs.some(y => y.id === user.id))});
          })
          .catch(err => {
          });
      }

    logout() {
        cookies.remove('user');
        this.props.navigate('/login');
    }

    render() {
        return (<AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: `1px solid #999999` }}
            >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
              <Typography variant="h6" color="inherit" noWrap align="left" sx={{ flexGrow: 1 }}>
                IFT605 - Projet
              </Typography>
              <nav>
                <Link
                  variant="button"
                  color="text.primary"
                  href="/training"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Entraînements
                </Link>
                <Link
                  variant="button"
                  color="text.primary"
                  href="/friend"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Amis
                </Link>
                <Link
                  variant="button"
                  color="text.primary"
                  href="/coach"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Coachs
                </Link>
                <Link
                  variant="button"
                  color="text.primary"
                  href="/stats"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Rapports
                </Link>
                <CoachingMenuEntry isCoaching={this.state !== null ? this.state.isCoaching : false}/>
              </nav>
              <Button onClick={this.logout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>Logout</Button>
            </Toolbar>
            </AppBar>);
    }
}






