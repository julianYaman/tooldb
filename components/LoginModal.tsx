import { Alert, Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaGithub, FaInfoCircle } from "react-icons/fa";
import { supabase } from "../util/supabase";

export default function LoginModal(props: any){

    const [showAlert, setShowAlert] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

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
                Sign in to toolDB
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
                <div className="flex flex-wrap">
                    <Button className="w-full flex-1" color="alternative" onClick={async () => await signInWithGithub()}><FaGithub className="mr-1 h-4 w-4"/> Sign in with GitHub</Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
        </div>
    )

}