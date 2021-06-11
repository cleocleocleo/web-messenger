import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
    Grid,
    Typography,
    Button,
    FormControl,
    TextField,
    InputAdornment,
    Link
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SideBanner } from "./Landing";
import { login } from "../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
    formContainer: {
        height: "100vh"
    },
    fromHeader: {
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 30,
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 80
    },
    title: {
        fontWeight: "600",
        marginBottom: 30
    },
    text: {
        fontSize: 14,
        paddingTop: 15,
        paddingBottom: 15
    },
    formInput: {
        width: "100%",
        marginBottom: 30
    },
    buttonContainer: {
        textAlign: "center",
        marginTop: 30
    }
}));

const Login = (props) => {
    const history = useHistory();
    const { user, login } = props;
    const classes = useStyles();

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        await login({ username, password });
    };

    if (user.id) {
        return <Redirect to="/home" />;
    }

    return (
        <Grid container justify="center">
            <SideBanner />
            <Grid item xs={12} md={7}>
                <Grid className={classes.formContainer}>
                    <Grid container item className={classes.fromHeader}>
                        <Grid item xs={12} sm={4}>
                            <Typography className={classes.text} color="secondary">Don't have an account?</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button variant="outlined" onClick={() => history.push("/register")}>Create account</Button>
                        </Grid>
                    </Grid>
                    <form onSubmit={handleLogin}>
                        <Grid container justify="center">
                            <Grid item xs={9} sm={7}>
                                <Typography className={classes.title} variant="h5">Welcome back!</Typography>
                                <FormControl margin="normal" required className={classes.formInput}>
                                    <TextField
                                        aria-label="username"
                                        label="Username"
                                        name="username"
                                        type="text"
                                    />
                                </FormControl>
                            </Grid >
                            <Grid item xs={9} sm={7}>
                                <FormControl margin="normal" required className={classes.formInput}>
                                    <TextField
                                        label="password"
                                        aria-label="password"
                                        type="password"
                                        name="password"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><Link variant="body2">Forgot?</Link></InputAdornment>,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} className={classes.buttonContainer}>
                                <Button type="submit" variant="contained" size="large">
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => {
            dispatch(login(credentials));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
