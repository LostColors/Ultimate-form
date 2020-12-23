import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import Typography  from '@material-ui/core/Typography';
import { MainContainer } from './components/MainContainer';
import { Form } from './components/Form';
import  { useForm } from 'react-hook-form';
import { PrimaryButton } from './components/PrimaryButton';
import { Input } from './components/Input';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import  { useData } from './DataContext';


const schema = yup.object().shape({
    firstName: yup.string().matches(/^([^0-9]*)$/, "First Name should not contain numbers").required("First Name is a required field"),
    lastName: yup.string().matches(/^([^0-9]*)$/, "Last Name should not contain numbers").required("Last Name is a required field")
});

export const Step1 = () => {
    const history = useHistory()
    const {data, setValues} = useData()

    const {register, handleSubmit, errors } = useForm({
        defaultValues: {firstName: data.firstName, lastName: data.lastName},
        mode:"onBlur",
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        history.push("/step2")
        setValues(data)
    }
    return(
    <MainContainer>
            <Typography component = "h2" variant = "h5">
                Step 1
            </Typography>
                <Form onSubmit = {handleSubmit(onSubmit)}>
                    < Input 
                    ref = {register}
                    id = "firstname"
                    type = "text"
                    label = "First Name"
                    name = "firstName" 
                    error={!!errors.firstName}
                    helperText = {errors?.firstName?.message}
                    />
                    < Input 
                    ref = {register}
                    id = "lastname"
                    type = "text"
                    label = "Last Name"
                    name = "lastName"
                    error={!!errors.lastName}
                    helperText = {errors?.lastName?.message}
                    />
                    <PrimaryButton>next</PrimaryButton>
                </Form>
            
         </MainContainer>
    )
}