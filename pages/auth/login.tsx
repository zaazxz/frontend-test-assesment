import React, { useMemo, useState } from 'react'
import SecondaryLayout from '@/layouts/secondary'
import {
    Input,
    Checkbox,
    Button,
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    Spinner,
    Form,
} from "@heroui/react";
import { useRouter } from 'next/router';

// Dummy account
const account = {
    email: "admin@gmail.com",
    password: "password",
};

// Eyelash icon
export const EyeSlashFilledIcon = (props?: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
                fill="currentColor"
            />
            <path
                d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
                fill="currentColor"
            />
            <path
                d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                fill="currentColor"
            />
            <path
                d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
                fill="currentColor"
            />
            <path
                d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const EyeFilledIcon = (props?: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
                fill="currentColor"
            />
            <path
                d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
                fill="currentColor"
            />
        </svg>
    );
};

const login = () => {

    // Router
    const router = useRouter();

    // State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        message: "",
        description: "",
    });

    // Disclosure
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Password visibility
    const toggleVisibility = () => setIsVisible(!isVisible);

    // Checkbox change
    const handleCheckboxChange = () => {
        setCheckbox(!checkbox);
    };

    // Validation on type
    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const isInvalid = useMemo(() => {

        // email
        if (email === "") return false;

        return !validateEmail(email);

    }, [email, password]);

    // Login logic
    const handleLogin = () => {

        // Check is invalid
        if (isInvalid) return

        // Validate email and password
        if (email === "" || password === "") {

            // Show error
            setError({
                message: "Error",
                description: "Please fill all the fields",
            });

            // Open modal
            onOpen();
            return

        }

        // Login logic
        if (email === account.email && password === account.password) {

            // Creating token and logged in user data, store to localStorage
            const token = crypto.randomUUID();

            // Store to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(account));

            // [debugging] check console
            // console.log(token);
            // console.log(account);

            // Show isLoading with setTimeout
            setIsLoading(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);


        } else {
            setError({
                message: "Error",
                description: "Invalid email or password",
            })

            // Open modal
            onOpen();
            return
        }

    }

    return (

        // Wrapper
        <>
            <SecondaryLayout>
                <div className="flex items-center h-screen bg-blue-700">

                    {/* Login Form */}
                    <Form className="w-2/5 h-full rounded-tr-2xl rounded-br-2xl bg-white p-5 flex justify-center items-center flex-col text-blue-700" onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}>

                        {/* Icon */}
                        <div className="flex items-center justify-center gap-2">
                            <img src="/images/logo/sovware-logo.png" alt="Logo" className="w-10 h-10" />
                        </div>

                        {/* Text welcome */}
                        <div className="flex items-center justify-center gap-1 mt-3 flex-col">
                            <h1 className="text-2xl">Welcome to <span className='font-bold'>S.2.R.E ADMIN</span></h1>
                            <p className="text-sm">Please login with your registered account</p>
                        </div>

                        {/* Form */}
                        <div className="w-[70%] p-2 mt-3 flex flex-col gap-3">

                            {/* Input email */}
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <Input
                                        label="Email"
                                        type="email"
                                        variant={"bordered"}
                                        required
                                        value={email}
                                        isInvalid={isInvalid}
                                        onValueChange={setEmail}
                                        color={isInvalid ? "danger" : "default"}
                                        errorMessage={isInvalid ? "Invalid email" : ""}
                                    />
                                </div>
                            </div>

                            {/* Input password */}
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <Input
                                        className="max-w"
                                        endContent={
                                            <button
                                                aria-label="toggle password visibility"
                                                className="focus:outline-solid outline-transparent mb-1.5"
                                                type="button"
                                                onClick={toggleVisibility}
                                            >
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        label="Password"
                                        type={isVisible ? "text" : "password"}
                                        variant="bordered"
                                        required
                                        onValueChange={setPassword}
                                    />
                                </div>
                            </div>

                            {/* Remember me */}
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <Checkbox size='sm' onChange={handleCheckboxChange}>
                                        <small className={`text-sm ${checkbox ? "text-blue-600" : "text-gray-600"}`}>Remember me</small>
                                    </Checkbox>
                                </div>
                            </div>

                            {/* Submit button */}
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <Button className="w-full" color="primary" type='submit'>
                                        Login
                                    </Button>
                                </div>
                            </div>

                        </div>

                    </Form>

                    {/* Decoration */}
                    <div className="w-3/5 h-full p-5 flex justify-center items-center flex-col text-white">

                        {/* Decoration Image */}
                        <div className="w-[70%]">
                            <img src="/images/assets/img-1.png" alt="Login" className="w-full h-full object-cover" />
                        </div>

                        {/* Main Text */}
                        <div className="flex items-center justify-center gap-2 flex-col">
                            <h1 className="text-xl font-bold">Building Happiness, Shaping Futures</h1>
                        </div>

                        {/* Sub Text */}
                        <div className="flex items-center justify-center gap-2 mt-5 flex-col w-[60%] text-center text-xs">
                            <p>Where joy meets learning, and dreams take flight: a school of happiness and endless possibilities.</p>
                        </div>

                    </div>

                </div>

                <Modal
                    backdrop="blur"
                    classNames={{
                        body: "p-10",
                        closeButton: "hover:bg-white/5 active:bg-white/10",
                    }}
                    isOpen={isOpen}
                    radius="lg"
                    onOpenChange={onOpenChange}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalBody>

                                    {/* Error icon (use internet for x icon) */}
                                    <div className="flex items-center justify-center gap-2">
                                        <div className='w-15 h-15 rounded-full bg-red-500 flex justify-center items-center text-2xl text-white'>
                                            x
                                        </div>
                                    </div>

                                    {/* Error message */}
                                    <div className="flex items-center justify-center gap-2">
                                        <h1 className="text-2xl font-bold">
                                            {error.message}
                                        </h1>
                                    </div>

                                    {/* Error description */}
                                    <div className="flex items-center justify-center gap-2">
                                        <p className="text-lg">
                                            {error.description}
                                        </p>
                                    </div>

                                    {/* Close button */}
                                    <div className="flex items-center justify-center gap-2">
                                        <Button onPress={onClose} color='primary' variant='flat'>Close</Button>
                                    </div>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>

            </SecondaryLayout>

            {/* Loading screen */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 flex-col">

                    {/* Image and text */}
                    <div className="flex items-center justify-center gap-5">
                        <img src="/images/logo/sovware-logo.png" alt="Logo" className="w-15 h-15" />

                        {/* Text */}
                        <div className="flex justify-center flex-col">
                            <h1 className="text-2xl font-bold">SOVWARE</h1>
                            <h1 className="text-2xl">EDGE SYSTEM</h1>
                        </div>

                    </div>

                    {/* Spinner */}
                    <div className="mt-10">
                        <Spinner />
                    </div>

                </div>
            )}
        </>

    )
}

export default login