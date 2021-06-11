import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    typography: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: 14,
        button: {
            textTransform: "none",
            letterSpacing: 0,
            fontWeight: "bold"
        }
    },
    overrides: {
        MuiInput: {
            input: {
                fontWeight: "bold"
            }
        },
        MuiButton: {
            contained: {
                borderRadius: 3,
                border: 0,
                width: 160,
                height: 56,
                boxShadow: "none",
                color: "white",
                backgroundColor: "#3A8DFF",
                "&:hover": {
                    backgroundColor: "#3A8DFF",
                }
            },
            outlined: {
                background: "white",
                border: "none",
                boxShadow: "0 2px 12px 0 rgba(74, 106, 149, 0.20)",
                borderRadius: 5,
                width: 170,
                height: 54,
                color: "#3A8DFF"
            }
        }
    },
    palette: {
        primary: { main: "#3A8DFF" },
        secondary: { main: "#B0B0B0" }
    }
});
