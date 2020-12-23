import React from 'react';
import { MainContainer } from './components/MainContainer';
import  Typography from '@material-ui/core/Typography';
import { Form } from './components/Form';
import { FileInput } from './FileInput';    
import { useForm } from 'react-hook-form';
import { PrimaryButton } from './components/PrimaryButton';
import { useHistory } from 'react-router-dom';
import  { useData } from './DataContext';


export const Step3 = () =>{
    const {data, setValues} = useData()
    const {control, handleSubmit}= useForm({
        defaultValues:{
            files: data.files
        }
    })

    

    const history = useHistory()
    

    const onSubmit = (data)=>{
        history.push("/Result")
        setValues(data)
        
    }
    return <MainContainer>
        <Typography component = "h2" variant = "h5">
            Step 3
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FileInput name="files" control={control} />
            <PrimaryButton>next</PrimaryButton>
        </Form>
    </MainContainer>
}
