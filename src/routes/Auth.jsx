import useDocumentTitle from "src/hooks/useDocumentTitle";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { google_provider } from "../firebase-init";
import { set_token } from "../slices/authSlice";
import { useDispatch } from "react-redux";

import { FaGoogle } from "react-icons/fa";

function loginUser(email, password, payload) {
	if(email === "" || password === ""){
		return
	}

	payload.setLoading(true);
	const auth = getAuth();

	signInWithEmailAndPassword(auth, email, password)
	.then(() => {
		payload.navigate("/");
	})
	.catch((error) => {
		// remove Firebase Prefix
		let errorMessage = error.message.split(":")[1];
		payload.setError(errorMessage);
	}).finally(()=>{
		payload.setLoading(false);
	});
}

function registerUser(email, password, confirmPassword, payload) {
	if(email === "" || password === "" || confirmPassword === ""){
		return
	}

	if(password !== confirmPassword){
		payload.setError("Error (Password not match)");
		return
	}	

	payload.setLoading(true);
	const auth = getAuth();

	createUserWithEmailAndPassword(auth, email, password)
	.then(() => {
		payload.navigate("/");
	})
	.catch((error) => {
		// remove Firebase Prefix
		let errorMessage = error.message.split(":")[1];
		payload.setError(errorMessage);
	}).finally(()=>{
		payload.setLoading(false);
	});
}

function loginWithGoogle({setError, dispatch, navigate}) {
	const auth = getAuth();
	const provider = google_provider;
	signInWithPopup(auth, provider).
		then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;
			dispatch(set_token({token}));
			navigate("/");
		}
	).catch((error) => {
			// remove Firebase Prefix
			let errorMessage = error.message.split(":")[1];
			setError(errorMessage);
		}
	);
}

function Auth(){
	useDocumentTitle("Auth");
	const [register, setRegister] = useState(false);

	return (
		<div className="md:grid grid-cols-2 block">
			<div className="px-10">
				<div className="h-screen flex items-center">
					<div className="bg-red-200 rounded-sm flex h-min w-full flex-col px-6 py-8">
						{register ? <RegisterComponent setRegister={setRegister} /> : <LoginComponent setRegister={setRegister} />}
					</div>
				</div>
			</div>
			<div className="h-screen bg-red-300 md:block hidden overflow-hidden">
				<img src="https://www.eloraflorist.com/wp-content/uploads/2018/03/toko-rangkaian-bunga-mawar-di-samarinda.png" />
			</div>
		</div>
	);
}

function LoginComponent({setRegister}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const payload = {
		navigate,
		setLoading,
		setError
	}

	return (
		<>
		{loading ?
			<div className="text-center font-bold text-3xl mb-6">
				Loading...
			</div>
			:
			<div>
				<div className="text-center font-bold text-3xl mb-6">
					Login
				</div>
				<div>
					{error !== "" &&
					<div className="text-center text-red-500 mb-2 font-bold">
						{error}
					</div>}
				</div>
				<div className="flex flex-col mb-2">
				  <div className="mr-2">
					  Email:
				  </div>
				  <input
					type="email"
					name="email"
					placeholder="Email"
					className="rounded-md bg-red-100 w-full p-2"
					value={email}
					onChange={(e)=>{setEmail(e.target.value)}}
				  />
				</div>
				<div className="flex flex-col">
				  <div className="mr-2">
					  Password:
				  </div>
				  <input
					type="password"
					name="password"
					placeholder="Password"
					className="rounded-md bg-red-100 w-full p-2"
					value={password}
					onChange={(e)=>{setPassword(e.target.value)}}
				  />
				</div>
				<div className="text-center">
					<button type="submit" className="hover:font-bold mt-6 text-center p-2" onClick={()=>loginUser(email,password,payload)}>Login</button>
				</div>
				<div className="text-red-400 text-center mt-2">
					Belum Punya Akun? <span className="text-red-500 font-bold cursor-pointer" onClick={()=>{setRegister(true)}}>Register</span>
				</div>
				<div className="text-center flex flex-col">
					<div type="submit" className="mt-6 text-center">Login with</div>
					<div className="flex justify-center mt-2">
						<div onClick={()=>{loginWithGoogle({setError, dispatch, navigate})}} className="hover:text-red-700 cursor-pointer bg-red-400 rounded-md px-2 py-2 h-10 w-10 flex justify-center items-center">
							<FaGoogle size={20}/>
						</div>
					</div>
				</div>
			</div>}
		</>
	);
}

function RegisterComponent({setRegister}) {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const payload = {
		navigate,
		setLoading,
		setError
	}

	return (
		<>
		{loading ?
			<div className="text-center font-bold text-3xl mb-6">
				Loading...
			</div>
			:
			<div>
				<div className="text-center font-bold text-3xl mb-6">
					Register
				</div>
				<div>
					{error !== "" &&
					<div className="text-center text-red-500 mb-2 font-bold">
						{error}
					</div>}
				</div>
				<div className="flex flex-col mb-2">
				  <div className="mr-2">
					  Email:
				  </div>
				  <input
					type="email"
					name="email"
					placeholder="Email"
					className="rounded-md bg-red-100 w-full p-2"
					value={email}
					onChange={(e)=>{setEmail(e.target.value)}}
				  />
				</div>
				<div className="flex flex-col mb-2">
				  <div className="mr-2">
					  Password:
				  </div>
				  <input
					type="password"
					name="password"
					placeholder="Password"
					className="rounded-md bg-red-100 w-full p-2"
					value={password}
					onChange={(e)=>{setPassword(e.target.value)}}
				  />
				</div>
				<div className="flex flex-col">
				  <div className="mr-2">
					  Confirm Password:
				  </div>
				  <input
					type="password"
					name="confirm_password"
					placeholder="Confirm Password"
					className="rounded-md bg-red-100 w-full p-2"
					value={confirmPassword}
					onChange={(e)=>{setConfirmPassword(e.target.value)}}
				  />
				</div>
				<div className="text-center">
					<button type="submit" className="hover:font-bold mt-6 text-center p-2" onClick={()=>{registerUser(email,password,confirmPassword,payload)}}>Register</button>
				</div>
				<div className="text-red-400 text-center mt-2">
					Sudah Punya Akun? <span className="text-red-500 font-bold cursor-pointer" onClick={()=>{setRegister(false)}}>Login</span>
				</div>
			</div>}
		</>
	);
}

export default Auth;