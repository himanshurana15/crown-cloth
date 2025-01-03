import { useState } from 'react';
// import { useEffect } from 'react' ;
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
// import FormFormInput from '../form-FormInput/form-FormInput.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.style.scss';
import Button from '../button/button.component';

const defualtFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:''
}

const SignUpForm = () => {
    const [formfields, setFormFields] = useState(defualtFormFields);
    const {displayName, email, password, confirmPassword} = formfields;

    // console.log(formfields);

    




    const resetFormFields = () => {
        setFormFields(defualtFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("passwords do not match ");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }
            else {
                console.log("user creation encountered an error" ,error);

            }

        }

    };


    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formfields, [name] : value});
    }

    return(
        <div className='sign-up-container'>
            <h2>Dont have an account</h2>
            <span>Sign up with your email and password </span>
            <form onSubmit = {handleSubmit}>
                
                <FormInput label = "Display Name" type = "text" required onChange = {handleChange} name = 'displayName' value = {displayName}/>

                <FormInput label="Email"  type = "email" required onChange = {handleChange} name = 'email' value = {email}/>

                <FormInput label="Password" type = "password" required onChange = {handleChange} name = 'password' value = {password}/>

                <FormInput label="Confirm Password" type = "password" required onChange = {handleChange} name = 'confirmPassword' value = {confirmPassword}/>
                <Button type = "submit">Sign Up</Button>
            </form>
        </div>
    )
};

export default SignUpForm;