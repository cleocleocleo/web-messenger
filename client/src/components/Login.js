import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
    Grid,
    Typography,
    Button,
    FormControl,
    TextField
} from "@material-ui/core";
import { SideBanner } from "./Landing";
import { login } from "../store/utils/thunkCreators";

const Login = (props) => {
    const history = useHistory();
    const { user, login } = props;

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
            <Grid item xs={7}>
                <Grid container item>
                    <Typography>Need to register?</Typography>
                    <Button onClick={() => history.push("/register")}>Register</Button>
                </Grid>
                <form onSubmit={handleLogin}>
                    <Grid>
                        <Grid>
                            <FormControl margin="normal" required>
                                <TextField
                                    aria-label="username"
                                    label="Username"
                                    name="username"
                                    type="text"
                                />
                            </FormControl>
                        </Grid>
                        <FormControl margin="normal" required>
                            <TextField
                                label="password"
                                aria-label="password"
                                type="password"
                                name="password"
                            />
                        </FormControl>
                        <Grid>
                            <Button type="submit" variant="contained" size="large">
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
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
