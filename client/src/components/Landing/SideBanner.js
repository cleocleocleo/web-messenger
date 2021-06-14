import {
    Grid,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BgImg from "../../assets/images/bg-img.png";
import { ReactComponent as BubbleIcon } from '../../assets/icons/bubble.svg';

const useStyles = makeStyles({
    sideBanner: {
        backgroundImage: `linear-gradient(rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url(${BgImg})`,
        backgroundSize: 'cover',
        overflow: 'hidden',
        color: 'white',
        height: '100vh'
    },
    sideBannerText: {
        fontSize: '1.5rem',
        textAlign: 'center'
    },
    iconContainer: {
        height: '100px'
    },
    textContainer: {
        height: "30%"
    }
});

const SideBanner = () => {
    const classes = useStyles();
    return (
        <Grid container item xs={12} md={5}
            className={classes.sideBanner}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid className={classes.iconContainer}>
                <BubbleIcon alt="speech bubble with ellipsis"/>
            </Grid>
            <Grid className={classes.textContainer}>
                <Typography className={classes.sideBannerText}>Converse with anyone</Typography>
                <Typography className={classes.sideBannerText}>with any language</Typography>
            </Grid>
        </Grid>
    );
}
 
export default SideBanner;