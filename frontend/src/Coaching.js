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
        return (
            <UserReportDetails params={params}/>
        );
    }
  }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 950,
  bgcolor: 'background.paper',
  border: '2px solid #cccccc',
  boxShadow: 24,
  p: 4
};

const theme = createTheme();

const columnsReports = [
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

class UserReportDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false, rows: []};
    }

    setOpen = (open) => {
        this.setState({open: open});
    };

    handleOpen = () => this.setOpen(true);
    handleClose = () => this.setOpen(false);

    componentDidMount() {
        fetch(ApiUrl + '/trainingReports', {
          "method": "GET",
          "headers": {
              "content-type": "application/json",
              "accept": "application/json"
          }})
          .then(response => response.json())
          .then(response => {
              this.setState({rows: response.filter(x => x.client.id === this.props.params.row.id)});
          })
          .catch(err => {});
      }

    render() {
        return (
            <Container maxWidth="l" sx={{borderBottom: `1px solid #cccccc`}}>
            <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={this.handleOpen}>
            Voir les rapports
                </Button>
            <Modal
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Rapports d'entraînement de {this.props.params.row.firstName + " " + this.props.params.row.lastName}
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                        <Box
                            sx={{
                                marginTop: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div style={{ float: 'right', height: '500px', width: '100%', marginTop: '10px' }}>
                                <DataGrid rows={this.state.rows}
                                columns={columnsReports}/>
                            </div>
                            </Box>
                        </Box>
                    </Box>
            </Modal>
        </Container>
        );
    }
}

export default class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: []};
  }

  componentDidMount() {
    let user = cookies.get('user');
    fetch(ApiUrl + '/clients', {
      "method": "GET",
      "headers": {
          "content-type": "application/json",
          "accept": "application/json"
      }})
      .then(response => response.json())
      .then(response => {
          this.setState({rows: response.filter(x => x.coachs.some(y => y.id === user.id))});
      })
      .catch(err => {});
  }

  render() {
    return (
        <ThemeProvider theme={theme}>
          <TopBar navigate={this.props.navigate}/>
          <Container component="main" maxWidth="l" sx={{marginTop: 2}}>
            <CssBaseline />
              <div style={{ float: 'right', height: '87vh', width: '100%', marginTop: '10px' }}>
                <DataGrid rows={this.state.rows}
                columns={columns}/>
              </div>
          </Container>
          <NotificationContainer />
        </ThemeProvider>
    );
  }
}