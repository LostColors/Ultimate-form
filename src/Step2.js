import { Input } from './components/Input';
import React  from 'react';
import { Form } from './components/Form';
import  { useForm } from 'react-hook-form';
import { MainContainer } from './components/MainContainer';
import { useHistory } from 'react-router-dom';
import  Typography  from '@material-ui/core/Typography';
import CheckBox from '@material-ui/core/Checkbox'
import { PrimaryButton } from './components/PrimaryButton';
import * as yup from 'yup'
import {  yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel } from '@material-ui/core';
import parsePhoneNumberFromString from 'libphonenumber-js';
import  { useData } from './DataContext';



const schema = yup.object().shape({
    email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is a required field"),
})
const normalizePhoneNumber = (value) =>{
    const phoneNumber = parsePhoneNumberFromString(value)
    if(!phoneNumber){
        return value
    }
    return(
        phoneNumber.formatInternational()
    )
}
export const Step2 = () => {
    const history = useHistory();
    const {data, setValues} = useData()

    const {register, handleSubmit, errors, watch}= useForm({
        defaultValues: {email: data.email, hasPhone: data.hasPhone, phoneNumber: data.phoneNumber },
        mode:"onBlur",
        resolver: yupResolver(schema)
    })
    
    
    const onSubmit = (data) => {
        history.push("/step3")
        setValues(data)
    }

    const hasPhone = watch("hasPhone")
    return (
    <MainContainer>
            <Typography component = "h2" variant = "h5">
                Step 2
            </Typography>
            <Form onSubmit = {handleSubmit(onSubmit)}>
                <Input
                ref={register}
                id = "email"
                type = "email"
                label = "Email"
                name = "email"
                required
                error = {!!errors.email}
                helperText= {errors?.email?.message}
                />
                <FormControlLabel 
                control = {
                    <CheckBox defaultValue={data.hasPhone} defaultChecked={data.hasPhone} name="hasPhone" inputRef={register} color="primary" />
                }
                label = "Do you have a phone number?"
                />
                {
                    hasPhone &&(
                        <Input 
                        ref={register}
                        id = "phoneNumber"
                        type = "tel"
                        label = "Phone number"
                        name = "phoneNimber"
                        onChange = {(event)=> {
                            event.target.value = normalizePhoneNumber(event.target.value)
                        }}
                        />
                    )
                }
                <PrimaryButton>next</PrimaryButton>
            </Form>
            
    </MainContainer>
    )
}
