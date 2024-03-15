"use client"
import { useRouter } from 'next/navigation';
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const router = useRouter();

    const [user, setUser] = useState({
        id: 0,
        idRefugio: 0,
        idTipoUsuario: 0,
        nombre: "",
        telefono: "",
        correo: "",
        fechaRegistro: "",
        municipio: 0,
        NIP: "",
        imagen: "",
        isSignedIn: false,
    });

    const logIn = async function (email, password, props) {
        const { setIsDialogUnfilledFields, setIsDialogFailedLogin } = props;

        if (!email || !password) {
            setIsDialogUnfilledFields(true);
        } else {
            try {
                // Make an HTTP POST request to the log-in API route
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.status != 200) {
                    setIsDialogFailedLogin(true);
                    return;
                }

                if (response.ok) {
                    response
                        .json()
                        .then((response) => {
                            // load user data into the context
                            let user = response.user
                            if (user.idTipoUsuario == 1) {//adoptante
                                setUser(
                                    (prevCriteria) => ({
                                        ...prevCriteria,
                                        id: user.id,
                                        idRefugio: user.idTipoUsuario == 1 ? 0 : user.idRefugio,
                                        idTipoUsuario: user.idTipoUsuario,
                                        nombre: user.nombre,
                                        telefono: user.telefono,
                                        correo: user.correo,
                                        fechaRegistro: user.fechaRegistro,
                                        municipio: user.idTipoUsuario == 1 ? user.municipio : 0,
                                        NIP: user.idTipoUsuario == 1 ? "" : user.NIP,
                                        imagen: user.imagen,
                                        isSignedIn: true,
                                    })
                                )
                            }
                        });

                    router.replace('/');
                }
            } catch (error) {
                console.error('An error occurred', error);
            }
        }
    };

    const logOut = async () => {
        try {
            setUser(
                (prevCriteria) => ({
                    ...prevCriteria,
                    id: 0,
                    isSignedIn: false,
                })
            )
        } catch (error) {
            console.error(error);
        }
    };

    const signUp = async (user) => {

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logIn,
                logOut,
                signUp,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
