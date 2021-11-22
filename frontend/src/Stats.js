import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import { DataGrid } from '@mui/x-data-grid';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cookies = new Cookies();

const columns = [
  { field: 'dateCreation', headerName: 'Date de création', width: 150 },
  { field: 'tpsTotalMinute', headerName: 'Temps en minutes', width: 150 },
  { field: 'nbCalorie', headerName: 'Calories', width: 150 },
  { field: 'description', headerName: 'Description', width: 150 },
  { field: 'bpmMoyen', headerName: 'BPM moyen', width: 150 },
  { field: 'bpmMax', headerName: 'BPM maximum', width: 150 },
  { field: 'bpmMin', headerName: 'BPM minimum', width: 150 },
  { field: 'pourcentageRealise', headerName: 'Pourcentage réalisé', width: 150 },
  { field: 'vitesseExecutionMoyenne', headerName: 'Vitesse d\'exécution moyenne', width: 150 },
];

const theme = createTheme();

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: [] };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch(this.props.apiUrl + '/trainingReports', {
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        }})
        .then(response => response.json())
        .then(response => {
            let user = cookies.get('user');
            console.log(response);
            this.setState((state, props) => {
                return {rows: response.filter(x => x.client.id === user.id)}
            });
        })
        .catch(err => {
            NotificationManager.error('An error occurred, try again', 'Error');
        });
  }

  logout() {
      cookies.remove('user');
      this.props.navigate('/login');
  }

  render() {
    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="l" sx={{marginTop: 2}}>
            <CssBaseline />
              <div style={{float: 'right'}}>
                <Button onClick={this.logout} variant="contained">Logout</Button>
              </div>
              <div style={{ float: 'right', height: '89vh', width: '100%', marginTop: '10px' }}>
                <DataGrid rows={this.state.rows} columns={columns}/>
              </div>
          </Container>
          <NotificationContainer />
        </ThemeProvider>
    );
  }
}