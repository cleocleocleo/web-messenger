import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
    Grid,
    Typography,
    Button,
    FormControl,
    TextField,
    FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SideBanner } from "./Landing";
import { register } from "../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
    formContainer: {
        height: "100vh"
    },
    formHeader: {
        wrap: "wrap",
        paddingTop: 30,
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 60
    },
    title: {
        fontWeight: "600",
    },
    text: {
        fontSize: 14,
        paddingTop: 15,
        paddingBottom: 15
    },
    formInput: {
        width: "100%",
        marginBottom: 15
    },
    buttonContainer: {
        textAlign: "center",
        marginTop: 30,
        marginBottom: 30
    }
}));

const Signup = (props) => {
    const history = useHistory();
    const { user, register } = props;
    const classes = useStyles();
    const [formErrorMessage, setFormErrorMessage] = useState({});

    const handleRegister = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password !== confirmPassword) {
            setFormErrorMessage({ confirmPassword: "Passwords must match" });
            return;
        }

        await register({ username, email, password });
    };

    if (user.id) {
        return <Redirect to="/home" />;
    }

    return (
        <Grid container justify="center">
            <SideBanner />
            <Grid item xs={12} md={7}>
                <Grid className={classes.formContainer}>
                    <Grid container item className={classes.formHeader} justify="flex-end" alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <Typography className={classes.text} color="secondary">Already have an account?</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button variant="outlined" onClick={() => history.push("/login")}>Login</Button>
                        </Grid>
                    </Grid>
                    <form onSubmit={handleRegister}>
                        <Grid container justify="center">
                            <Grid item xs={9} sm={7}>
                                <Typography className={classes.title} variant="h5">Create an account.</Typography>
                                <FormControl margin="normal" required className={classes.formInput}>
                                    <TextField
                                        aria-label="username"
                                        label="Username"
                                        name="username"
                                        type="text"
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={9} sm={7}>
                                <FormControl margin="normal" required className={classes.formInput}>
                                    <TextField
                                        aria-label="e-mail address"
                                        label="E-mail address"
                                        type="email"
                                        name="email"
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={9} sm={7}>
                                <FormControl
                                    className={classes.formInput}
                                    margin="normal"
                                    required
                                    error={!!formErrorMessage.confirmPassword}
                                >
                                    <TextField
                                        aria-label="password"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        required
                                        inputProps={{ minLength: 6 }}
                                    />
                                    <FormHelperText>
                                        {formErrorMessage.confirmPassword}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={9} sm={7}>
                                <FormControl
                                    className={classes.formInput}
                                    margin="normal"
                                    error={!!formErrorMessage.confirmPassword}
                                >
                                    <TextField
                                        aria-label="confirm password"
                                        label="Confirm Password"
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        inputProps={{ minLength: 6 }}
                                    />
                                    <FormHelperText>
                                        {formErrorMessage.confirmPassword}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} className={classes.buttonContainer}>
                                <Button type="submit" variant="contained" size="large">
                                    Create
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
        register: (credentials) => {
            dispatch(register(credentials));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
