import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { login, logout } from "./slices/authSlice.jsx";
import { useDispatch } from "react-redux";


export function App(props) {
    const auth = getAuth()
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(login({user}))
            } else {
                dispatch(logout())
            }
        });
    }, [])

    return (
        <div className="App">
            {props.children}
        </div>
    )
}