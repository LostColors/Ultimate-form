import React from 'react'   
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'


const useStyle = makeStyles((theme) => ({
    root:{
        fontFamily: "Fjalla One, sans-serif",
        margin: theme.spacing(3, 0, 2),
        textAlign: "center",
        fontSize: "40px",
        color: "#444",
        


    }
}))

export const Header = () => {
    const styles = useStyle()
    return <Typography className={styles.root} component = "h1" variant="h5">The Ultimate Form Challenge </Typography>
}