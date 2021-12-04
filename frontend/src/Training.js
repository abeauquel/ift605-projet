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
import TextField from '@mui/material/TextField';
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

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #cccccc',
    boxShadow: 24,
    p: 4
};

const columnsTraining = [
    { field: 'name', headerName: 'Nom de l\'entraînement', width: 300 },
    { field: 'dateCreation', headerName: 'Date de création de l\'entraînement', width: 300 },
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 300,
        renderCell: (params) => {
            return (
                <DetailsModal params={params}/>
            );
        }
    }
];

const columnsExercice = [
    { field: 'exercice', headerName: 'Nom de l\'exercice', width: 150 },
    { field: 'set', headerName: 'Set', width: 150 },
    { field: 'repetition', headerName: 'Répétitions', width: 150 }
];

var exerciceInTraining = [];
var updated = false;
var refreshRows = false;

function CustomToolbarAddExercice() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [exercice, setExercice] = React.useState('');
    const [exercicesAvailable, setExercicesAvailable] = React.useState([]);

    const handleChange = (event) => {
        setExercice(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let newExerciceInTraining = {
            id: exercice,
            exercice: exercicesAvailable.find(x => x.id === exercice).name,
            set: data.get('set'),
            repetition: data.get('repeat')
        };
        console.log(newExerciceInTraining);
        exerciceInTraining = Object.assign([], exerciceInTraining)
        exerciceInTraining.push(newExerciceInTraining);
        setOpen(false);
        updated = true;
    };

    if (exercicesAvailable.length === 0) {
        fetch(ApiUrl + '/exercices', {
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        }})
        .then(response => response.json())
        .then(response => {
            setExercicesAvailable(response);
        })
        .catch(err => {
            NotificationManager.error('An error occurred, try again', 'Error');
        });
    }

    return (
        <Container maxWidth="l" sx={{paddingBottom: 6.5, borderBottom: `1px solid #cccccc`}}>
            <Button onClick={handleOpen} variant="outlined" sx={{ position: "absolute", left: 1, my: 1, mx: 1 }}>Ajouter un exercice</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Ajouter un exercice
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <Select 
                                required
                                fullWidth 
                                onChange={handleChange} 
                                label="Exercice"    
                                id="select-exercice"
                                value={exercice}
                            >
                                {exercicesAvailable?.map(option => {
                                    return (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name ?? option.id}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    label="Set"
                                    id="set"
                                    name="set"
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    label="Répétitions"
                                    id="repeat"
                                    name="repeat"
                                />
                            </Grid>
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

function CustomToolbar() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const fetchExerciceInTrainingPost = async () => {
        const fetchPromiseArray = exerciceInTraining.map(x => {
            return fetch(ApiUrl + '/exerciceintraining', {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                "body": JSON.stringify({
                    "exercice": {
                        id: x.id,
                        name: x.exercice
                    },
                    "repetition": x.repetition,
                    "set": x.set
                })
            })
            .then(response => response.json())
        });

        return await Promise.all(fetchPromiseArray);
    };

    const handleSubmit = () => {
        let trainingName = document.getElementById('trainingName').value;
        console.log(exerciceInTraining);
        console.log(trainingName);

        let user = cookies.get('user');

        fetchExerciceInTrainingPost().then(responses => {
            console.log(responses);

            fetch(ApiUrl + '/training', {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                "body": JSON.stringify({
                    name: trainingName,
                    creator: user,
                    exerciceInTrainingList: responses.map(x => ({"id": x.id})),
                })
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                refreshRows = true;
            })
            .catch(err => {
                NotificationManager.error('An error occurred, try again', 'Error');
            });
        });

        exerciceInTraining = Object.assign([], [])
        setOpen(false);
    };

    return (
        <Container maxWidth="l" sx={{paddingBottom: 6.5, borderBottom: `1px solid #cccccc`}}>
            <Button onClick={handleOpen} variant="outlined" sx={{ position: "absolute", left: 1, my: 1, mx: 1 }}>Ajouter un entraînement</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Ajouter un entraînement
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="trainingName"
                            label="Nom de l'entraînement"
                            name="trainingName"
                            autoFocus
                        />
                        <div style={{ float: 'right', height: '500px', width: '100%', marginTop: '10px' }}>
                            <DataGrid rows={exerciceInTraining}
                            components={{
                                Toolbar: CustomToolbarAddExercice,
                            }}
                            columns={columnsExercice}/>
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={handleSubmit}
                        >
                            Ajouter l'entraînement
                        </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
}

class DetailsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    setOpen = (open) => {
        this.setState({open: open});
    };

    handleOpen = () => this.setOpen(true);
    handleClose = () => this.setOpen(false);

    onDelete = (e) => {
        e.stopPropagation();

        fetch(ApiUrl + '/training/' + this.props.params.row.id, {
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            }})
            .then(response => response.json())
            .then(response => {
                refreshRows = true;
            })
            .catch(err => {
                refreshRows = true;
            });
    };

    render() {
        return (
            <Grid>
                <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={this.onDelete}>
                    Supprimer
                </Button>
                <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={this.handleOpen}>
                    Détails
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Training details: {this.props.params.row.name}
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
                                <DataGrid rows={this.props.params.row.exerciceInTrainingList.map(x => ({
                                    "id": x.id,
                                    "exercice": x.exercice.name,
                                    "set": x.set,
                                    "repetition": x.repetition
                                }))}
                                columns={columnsExercice}/>
                            </div>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </Grid>
        );
    };
}

const theme = createTheme();

export default class Training extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rows: [] };

        const callback = () => {
            if (updated) {
                this.forceUpdate();
                updated = false;
            }

            if (refreshRows) {
                this.getRows();
                refreshRows = false;
            }
        };
        setInterval(callback, 200);
    }

    componentDidMount() {
        this.getRows();
    }

    getRows() {
        fetch(this.props.apiUrl + '/trainings', {
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
                    return {rows: response.filter(x => x.creator.id === user.id)}
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
                    columns={columnsTraining}/>
                    </div>
            </Container>
            <NotificationContainer />
            </ThemeProvider>
        );
    }
}