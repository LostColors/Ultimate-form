import React from 'react'
import { MainContainer } from './components/MainContainer'
import Typography from '@material-ui/core/Typography'
import { ListItemIcon, ListItemText, makeStyles, TableCell, TableContainer, TableHead } from '@material-ui/core'
import {  Paper, Table, TableBody, TableRow } from '@material-ui/core'
import { useData } from './DataContext'
import { Link } from 'react-router-dom'
import { List, ListItem } from '@material-ui/core'
import { InsertDriveFile } from '@material-ui/icons'
import { PrimaryButton } from './components/PrimaryButton'
import Swal from 'sweetalert2'


const useStyles = makeStyles({
    root:{
        marginBottom: "30px"
    },
    table:{
        marginBottom: "30px"
    },
    link:{
        textDecoration:"none",
        color: "coral"
    }
    


})

export const Result = () => {
    
    const styles = useStyles()
    const {data} = useData()
    const entries = Object.entries(data).filter((entry)=> entry[0]!=="files")
    const {files} = data;
    const onSubmit= async()=>{
        const formData= new FormData()
        if(data.files){
            data.files.forEach(file =>{
                formData.append("files", file, file.name)
            })
        }
        entries.forEach(entry => {
            formData.append(entry[0], entry[1])
            console.log(entries)
        })
        const res = await fetch("http://localhost:4000/",{
            method: "POST",
            body: formData
        })
        if(res.status===200){
            Swal.fire("Great job!","You've passed the challenge", "success")
            
        }
    }
    
    


    return(
        <MainContainer>
        <Typography component = "h2" variant = "h5">
            Result
        </Typography>
        <TableContainer className={styles.root} component = {Paper}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Field
                        </TableCell>
                        <TableCell align="right">
                            Value
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        entries.map(entry =>(
                            <TableRow key = {entry[0]}>
                                <TableCell>  
                                    {entry[0]}
                                </TableCell>
                                <TableCell align="right">
                                    {entry[1].toString()}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        {
            files &&(
                <>
                <Typography component = "h2" variant = "h5">
                    Files
                </Typography>
                <List>
                    {
                        files.map((f, index) => (
                            <ListItem key = {index}>
                                <ListItemIcon>
                                    <InsertDriveFile/>
                                </ListItemIcon>
                                <ListItemText primary={f.name} secondary={f.size}/>
                            </ListItem>
                        ))
                    }
                </List>
                </>
            )
        }
        <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
         <Link className={styles.link} to= {"/"} >Start Over</Link> 
        </MainContainer>
    )
}