import { useState } from 'react';
// import { useEffect } from 'react' ;
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
// import FormFormInput from '../form-FormInput/form-FormInput.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.style.scss';
import Button from '../button/button.component';

const defualtFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formfields, setFormFields] = useState(defualtFormFields);
    const { email, password} = formfields;


    console.log(null);
    const resetFormFields = () => {
        setFormFields(defualtFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        }
        catch(error){
            
            switch(error.code){
                case 'auth/wrong-password' : 
                    alert('Incorrect password for email');
                    break;

                case 'auth/invalid-credential':
                    alert('user email does not match');
                    break;
                default:
                    console.log(error)
            }
            console.log(error);
        }
    };


    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formfields, [name] : value});
    }

    return(
        <div className='sign-up-container'>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password </span>
            <form onSubmit = {handleSubmit}>
                
                <FormInput label="Email"  type = "email" required onChange = {handleChange} name = 'email' value = {email}/>

                <FormInput label="Password" type = "password" required onChange = {handleChange} name = 'password' value = {password}/>
                <div className='buttons-container'>
                    <Button type = "submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick = {signInWithGoogle}> Google Sign In </Button>
            
                </div>
            </form>
        </div>
    )
};

export default SignInForm;