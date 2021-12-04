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

const columns = [
  { field: 'firstName', headerName: 'Prénom', width: 150 },
  { field: 'lastName', headerName: 'Nom', width: 150 },
  { field: 'userName', headerName: 'Nom d\'utilisateur', width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 300,
    renderCell: (params) => {
        let user = cookies.get('user');

        const onDelete = (e) => {
          e.stopPropagation();

          fetch(ApiUrl + "/client/" + user.id + "/friend/" + params.row.id, {
              "method": "DELETE",
              "headers": {
                  "content-type": "application/json",
                  "accept": "application/json"
              }})
              .then(response => response.json())
              .then(response => {
                  updated = true;
              })
              .catch(err => {
                  updated = true;
              });
        };

        return (
          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={onDelete}>
              Retirer
          </Button>
        );
    }
  }
];

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

var updated = false;

const theme = createTheme();

function CustomToolbar() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [friend, setFriend] = React.useState('');
    const [friendsAvailable, setFriendsAvailable] = React.useState([]);
    const user = cookies.get('user');

    const handleChange = (event) => {
      setFriend(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (friend !== '') {
            addFriend(user.id, friend);
            setOpen(false);
        }
    };

    const addFriend = (userId, friendId) => {
      fetch(ApiUrl + "/client/" + userId + "/friend/" + friendId, {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        }})
        .then(response => response.json())
        .then(response => {
            console.log(response);
            updated = true;
        })
        .catch(err => {
            NotificationManager.error('An error occurred, try again', 'Error');
        });
    }

    fetch(ApiUrl + '/clients', {
      "method": "GET",
      "headers": {
          "content-type": "application/json",
          "accept": "application/json"
      }})
      .then(response => response.json())
      .then(response => {
          setFriendsAvailable(response.filter(x => x.id !== user.id));
      })
      .catch(err => {
          NotificationManager.error('An error occurred, try again', 'Error');
      });

    return (
        <Container maxWidth="l" sx={{paddingBottom: 6.5, borderBottom: `1px solid #cccccc`}}>
            <Button onClick={handleOpen} variant="outlined" sx={{ position: "absolute", left: 1, my: 1, mx: 1 }}>Ajouter un ami</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Ajouter un ami
                    </Typography>
                    <Box
                        sx={{
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                          <Grid item xs={12} sm={12}>
                          <Select 
                              required
                              fullWidth 
                              onChange={handleChange} 
                              label="Utilisateur"
                              id="select-friend"
                              value={friend}
                          >
                              {friendsAvailable?.map(option => {
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
                        >
                            Ajouter l'exercice
                        </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
  }

export default class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: [] };

    const callback = () => {
        if (updated) {
            this.getRows();
            updated = false;
        }
    };
    setInterval(callback, 200);
  }

  componentDidMount() {
    this.getRows();
  }

  getRows() {
    let user = cookies.get('user');
    fetch(this.props.apiUrl + '/client/' + user.id, {
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        }})
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.setState((state, props) => {
                return {rows: response.friends}
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
              <div style={{ float: 'right', height: '87vh', width: '100%', marginTop: '10px' }}>
                <DataGrid rows={this.state.rows}
                components={{
                    Toolbar: CustomToolbar,
                  }}
                columns={columns}/>
              </div>
          </Container>
          <NotificationContainer />
        </ThemeProvider>
    );
  }
}