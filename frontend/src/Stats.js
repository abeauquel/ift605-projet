import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Cookies from 'universal-cookie';
import { DataGrid } from '@mui/x-data-grid';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TopBar from './TopBar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ApiUrl from './Constants';

const cookies = new Cookies();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 850,
  bgcolor: 'background.paper',
  border: '2px solid #cccccc',
  boxShadow: 24,
  p: 4
};

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
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 300,
    renderCell: (params) => {
        return (
          <Challenge params={params}/>
        );
    }
  }
];

const theme = createTheme();

class Challenge extends React.Component {
  constructor(props) {
    super(props);
    let user = cookies.get('user');
    this.state = {open: false, friends: user.friends, friend: ''};
  }

  setOpen = (open) => {
      this.setState({open: open});
  };

  setFriend = (friend) => {
    this.setState({friend: friend});
  };

  handleOpen = () => this.setOpen(true);
  handleClose = () => this.setOpen(false);

  handleChange = (event) => {
    this.setFriend(event.target.value);
  };

  onChallenge = (e) => {
    let user = cookies.get('user');
    e.stopPropagation();

    fetch(ApiUrl + "/client/" + user.id + "/challenge", {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify({
          "clientDTO": {
            "id": this.state.friend
          },
          "idTraining": this.props.params.row.training.id
        })
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => {});
  };

  render() {
    return (
        <Container maxWidth="l" sx={{borderBottom: `1px solid #cccccc`}}>
            <Button onClick={this.handleOpen} variant="outlined">Défier</Button>
            <Modal
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Défier un ami pour l'entraînement {this.props.params.row.training.name}
                    </Typography>
                    <Box
                        sx={{
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                          <Grid item xs={12} sm={12}>
                          <Select 
                              required
                              fullWidth 
                              onChange={this.handleChange} 
                              label="Utilisateur"
                              id="select-friend"
                              value={this.state.friend}
                          >
                              {this.state.friends?.map(option => {
                                  return (
                                      <MenuItem key={option.id} value={option.id}>
                                          {option.firstName + " " + option.lastName ?? option.id}
                                      </MenuItem>
                                  );
                              })}
                          </Select>
                          </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={this.onChallenge}
                        >
                            Défier
                        </Button>
                        </Box>
                </Box>
            </Modal>
        </Container>
    );
  }
}

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: [] };
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

  render() {
    return (
        <ThemeProvider theme={theme}>
          <TopBar navigate={this.props.navigate}/>
          <Container component="main" maxWidth="l" sx={{marginTop: 2}}>
            <CssBaseline />
              <div style={{ float: 'right', height: '91vh', width: '100%', marginTop: '10px' }}>
                <DataGrid rows={this.state.rows} columns={columns}/>
              </div>
          </Container>
          <NotificationContainer />
        </ThemeProvider>
    );
  }
}