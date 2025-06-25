import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';



const provider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user,setuser]=useState(null)
    const[loading,setLoading]=useState(true)



    const googleSgnIn  =()=>{
        setLoading(true)
        return signInWithPopup(auth,provider)
    }



    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)

    }

    // signIn user
    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    // signOut user

    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }


    // observe user state change
        useEffect(() => {
            const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
                setuser(currentUser);
                setLoading(false);
            });

            return () => {
                unSubscribe();
            };
        }, []);





    const authInfo = {
        user,
        createUser,
        loading,
        signIn,
        logOut,
        googleSgnIn

    }


    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;