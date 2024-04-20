import { createContext, useEffect, useState } from "react";
import { app } from "./firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    const sentEmailVerify = () => {
        return sendEmailVerification(auth.currentUser);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            //jwt-------------------------------------------
            if (currentUser) {
                const userInfo = { email: currentUser?.email }
                axios.post('https://bistro-boss-restaurant-server-nu.vercel.app/jwt', userInfo)
                    .then(res => {
                        if (res?.data?.token) {
                            localStorage.setItem('access-token', res?.data?.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            //--------------------------------
            console.log("current user", currentUser)

        });
        return () => {
            return unSubscribe();
        }
    }, [])
    const authInfo = {
        user,
        loading,
        signUp,
        logIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        sentEmailVerify,


    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;