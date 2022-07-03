import { Alert, Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaGithub, FaInfoCircle } from "react-icons/fa";
import { supabase } from "../util/supabase";

export default function LoginModal(props: any){

    const [showRegisterContent, setShowRegisterContent] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)

    const [alertMessage, setAlertMessage] = useState("")

    const initialLoginData = Object.freeze({
        email: "",
        password: ""
    });

    const initialRegisterData = Object.freeze({
        registerUsername: "",
        registerEmail: "",
        registerRepeatEmail: "",
        registerPassword: ""
    });

    const [formData, updateFormData] = useState(initialLoginData);
    const [formRegisterData, updateRegisterFormData] = useState(initialRegisterData);

    const handleChange = (e:any) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleRegisterChange = (e:any) => {
        updateRegisterFormData({
            ...formRegisterData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    async function recoverPassword() {
        if(formData.email.trim() === ""){
            setShowAlert(true)
            setAlertMessage("Please enter an email address in the email field")
        }else if(!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            setShowAlert(true)
            setAlertMessage("Please enter a valid email address")
        }else{

            const { data, error } = await supabase.auth.api.resetPasswordForEmail(formData.email);

            if(error){
                setShowAlert(true)
                setAlertMessage(error.message)
            }else{
                setShowAlert(false)
                setShowSuccessAlert(true)
                setAlertMessage("Password reset email sent. Please check your email.")
                // TODO: Create a basic site for this and link to it in the email
            }

        }
    }

    async function signInWithEmail() {

        if(formData.email.trim() === ""){
            setShowAlert(true)
            setAlertMessage("Please enter an email address")
        }else if(formData.password.trim() === ""){
            setShowAlert(true)
            setAlertMessage("Please enter a password")
        }else{
            const { user, error } = await supabase.auth.signIn({
                email: formData.email,
                password: formData.password,
            })

            if(error){
                setShowAlert(true)
                setAlertMessage(error.message)
            }

            if(user){
                setShowAlert(false)
                setShowSuccessAlert(true)
                setAlertMessage("Successfully signed in")
                window.location.reload()
            }
        }
    }

    async function registerWithEmail() {
        const { user, error } = await supabase.auth.signUp({
            email: formRegisterData.registerEmail,
            password: formRegisterData.registerPassword,
        })

        if(error){
            setShowAlert(true)
            setAlertMessage(error.message)
        }

        if(user){
            const {data, error: error2} = await supabase.from("profiles").insert({
                username: formRegisterData.registerUsername,
                user_id: user.id
            })

            if(error2){
                setShowAlert(true)
                setAlertMessage(error2.message)
            }

            if(data){
                setShowAlert(false)
                setShowSuccessAlert(true)
                setAlertMessage("Successfully registered. Please check your email to verify your account.")
            }
        }

    }

    async function signInWithGithub() {
        const { user, session, error } = await supabase.auth.signIn({
          provider: 'github',
        })
    }

    
    return (
        <div>
        <Modal
            show={true}
            size="md"
            popup={true}
            onClose={() => props.showHandler(false)}
        >
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                { showRegisterContent ? "Register" : "Sign in" } to toolDB
                </h3>
                { showAlert ? (
                    <Alert
                        color="red"
                        icon={FaInfoCircle}
                    >
                        <span>{alertMessage}</span>
                    </Alert> ) : null }
                { showSuccessAlert ? (
                    <Alert
                        color="green"
                        icon={FaInfoCircle}
                    >
                        <span>{alertMessage}</span>
                    </Alert> ) : null }
                { !showRegisterContent ? (
                <>
                    <form className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-500 dark:text-white"
                            >E-Mail</label>
                        </div>
                        <TextInput
                            id="email"
                            name="email"
                            placeholder="mail@example.com"
                            onChange={handleChange}
                            type="email"
                            required={true} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-500 dark:text-white"
                            >Password</label>
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            required={true} />
                    </div>
                    <div className="flex justify-between">
                        <a
                            onClick={() => recoverPassword()}
                            className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Lost Password?
                        </a>
                    </div>
                    <div className="w-full">
                        <Button 
                            onClick={async (e) => {
                                e.preventDefault()
                                if(formData.email.trim() === ""){
                                    setShowAlert(true)
                                    setAlertMessage("Please enter an email address")
                                }
                                else if(formData.password.trim() === ""){
                                    setShowAlert(true)
                                    setAlertMessage("Please enter a password")
                                }
                                else{
                                    // Check if email is valid and could be a real email adress
                                    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
                                        await signInWithEmail()
                                    }else{
                                        setShowAlert(true)
                                        setAlertMessage("Please enter a valid email address")
                                    }
                                }
                            }}
                            type="submit"
                        >
                            Log in to your account
                        </Button>
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?{' '}
                        <a
                            onClick={() => {setShowRegisterContent(true); setShowAlert(false)}}
                            className="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer"
                        >
                            Create account
                        </a>
                    </div>
                    </form>
                </>
                ) : (
                <>
                    <form className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <label
                                htmlFor="registerUsername"
                                className="text-sm font-medium text-gray-500 dark:text-white"
                            >Username</label>
                        </div>
                        <TextInput
                            id="registerUsername"
                            name="registerUsername"
                            onChange={handleRegisterChange}
                            placeholder=""
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label
                                htmlFor="registerEmail"
                                className="text-sm font-medium text-gray-500 dark:text-white"
                            >E-Mail</label>
                        </div>
                        <TextInput
                            id="registerEmail"
                            name="registerEmail"
                            onChange={handleRegisterChange}
                            placeholder=""
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label
                                htmlFor="registerRepeatEmail"
                                className="text-sm font-medium text-gray-500 dark:text-white"
                            >Repeat E-Mail</label>
                        </div>
                        <TextInput
                            id="registerRepeatEmail"
                            name="registerRepeatEmail"
                            onChange={handleRegisterChange}
                            placeholder=""
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label
                                htmlFor="registerPassword"
                                className="text-sm font-medium text-gray-500 dark:text-white"
                            >Password</label>
                        </div>
                        <TextInput
                            id="registerPassword"
                            name="registerPassword"
                            onChange={handleRegisterChange}
                            type="password"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            onClick={async (e) => {
                                e.preventDefault()
                                if(formRegisterData.registerEmail.trim() === ""){
                                    setShowAlert(true)
                                    setAlertMessage("Please enter an email address")
                                }
                                else if(formRegisterData.registerRepeatEmail.trim() === ""){
                                    setShowAlert(true)
                                    setAlertMessage("Please repeat your email address")
                                }
                                else if(formRegisterData.registerUsername.trim() === ""){
                                    setShowAlert(true)
                                    setAlertMessage("Please enter a username")
                                }
                                else if(formRegisterData.registerUsername.trim().length < 5){
                                    setShowAlert(true)
                                    setAlertMessage("Username must be at least 5 characters long")
                                }
                                else if(formRegisterData.registerPassword.trim() === ""){
                                    setShowAlert(true)
                                    setAlertMessage("Please enter a password")
                                }
                                else if(formRegisterData.registerPassword.trim().length < 8){
                                    setShowAlert(true)
                                    setAlertMessage("Password must be at least 8 characters long")
                                }
                                else if(formRegisterData.registerEmail !== formRegisterData.registerRepeatEmail){
                                    setShowAlert(true)
                                    setAlertMessage("Your email addresses do not match")
                                }
                                else{
                                    // Check if email is valid and could be a real email adress
                                    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formRegisterData.registerEmail)){
                                        await registerWithEmail()
                                    }else{
                                        setShowAlert(true)
                                        setAlertMessage("Please enter a valid email address")
                                    }
                                }
                            }
                        }
                        >
                            Register
                        </Button>
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already registered?{' '}
                        <a
                            onClick={() => {setShowRegisterContent(false); setShowAlert(false)}}
                            className="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer"
                        >
                            Log in
                        </a>
                    </div>
                    </form>
                </>
                )}
            </div>
            <p className="text-center font-medium text-gray-500 mb-5">or</p>
            <div className="flex flex-wrap">
                <Button className="w-full flex-1" color="alternative" onClick={() => signInWithGithub()}><FaGithub className="mr-1 h-4 w-4"/> Sign in with GitHub</Button>
            </div>
            </Modal.Body>
        </Modal>
        </div>
    )

}