import EyeFilledIcon from '@/components/icons/EyeFilledIcon';
import EyeSlashFilledIcon from '@/components/icons/EyeSlashFilledIcon';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import SecondaryLayout from '@/layouts/secondary';
import { useLoginStore } from '@/stores/useLoginStore';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    useDisclosure,
} from "@heroui/react";
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const login = () => {

    // Router
    const router = useRouter();

    // Store
    const {
        email,
        password,
        checkbox,
        isVisible,
        isLoading,
        error,
        login,
        setError,
        setEmail,
        setPassword,
        toggleCheckbox,
        toggleVisibility,
    } = useLoginStore();

    // Disclosure
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Validation while typing
    const validateEmail = (email: string) =>
        String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    const isInvalid = useMemo(() => {
        if (email === '') return false;
        return !validateEmail(email);
    }, [email]);


    // Login logic
    const handleLogin = async () => {
        if (isInvalid) return;

        if (email === '' || password === '') {
            setError({ 
                message: 'Error', 
                description: 'Please fill all the fields' 
            });
            onOpen();
            return;
        }

        const success = await login();

        if (success) {
            setTimeout(() => router.push('/design'), 1000);
        } else {
            setError({ 
                message: 'Error', 
                description: 'Invalid email or password' 
            });
            onOpen();
        }
    }

    return (

        // Wrapper
        <>
            <SecondaryLayout title="Login">
                <div className="flex items-center h-screen bg-blue-700">

                    {/* Login Form */}
                    <Form className="w-full block lg:w-2/5 lg:h-full rounded-xl lg:rounded-none lg:rounded-tr-2xl lg:rounded-br-2xl bg-white p-5 lg:flex justify-center items-center flex-col text-blue-700 m-5 lg:m-0" onSubmit={(e) => {
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
                        <div className="w-full lg:w-[70%] p-2 mt-3 flex flex-col gap-3">

                            {/* Input email */}
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex w-full flex-wrap lg:flex-nowrap mb-6 lg:mb-0 gap-4">
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
                                <div className="flex w-full flex-wrap lg:flex-nowrap mb-6 lg:mb-0 gap-4">
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
                                <div className="flex w-full flex-wrap lg:flex-nowrap mb-6 lg:mb-0 gap-4">
                                    <Checkbox size='sm' onChange={toggleCheckbox}>
                                        <small className={`text-sm ${checkbox ? "text-blue-600" : "text-gray-600"}`}>Remember me</small>
                                    </Checkbox>
                                </div>
                            </div>

                            {/* Submit button */}
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex w-full flex-wrap lg:flex-nowrap mb-6 lg:mb-0 gap-4">
                                    <Button className="w-full" color="primary" type='submit'>
                                        Login
                                    </Button>
                                </div>
                            </div>

                        </div>

                    </Form>

                    {/* Decoration */}
                    <div className="hidden lg:w-3/5 h-full p-5 lg:flex justify-center items-center flex-col text-white">

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
                <LoadingOverlay />
            )}
        </>

    )
}

export default login