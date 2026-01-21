import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Dashboard } from "./pages/DashBoard";
import { useRef } from "react";
import axios from "axios";

function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post("http://localhost:3000/api/v1/signin", {
            username, password
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
    }

    return <div className="h-screen w-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-800 flex justify-center items-center">
        <div className="absolute top-4">
            <h1 className="text-3xl font-bold text-cyan-300 font-serif">BRAINLY</h1>
        </div>
        <div className="bg-white rounded-xl border min-w-48 p-8 shadow-lg flex flex-col gap-4">
            <input ref={usernameRef} type="text" placeholder="Username" className="p-2 border rounded" />
            <input ref={passwordRef} type="password" placeholder="Password" className="p-2 border rounded" />
            <button onClick={signin} className="bg-purple-600 text-white p-2 rounded">Sign In</button>
        </div>
    </div>
}

function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post("http://localhost:3000/api/v1/signup", {
            username, password
        });
        alert("Signed up!");
        navigate("/signin");
    }

    return <div className="h-screen w-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-800 flex justify-center items-center">
        <div className="absolute top-4 left-4">
            <h1 className="text-3xl font-bold text-cyan-300">BRAINLY</h1>
        </div>
        <div className="bg-white rounded-xl border min-w-48 p-8 shadow-lg flex flex-col gap-4">
            <input ref={usernameRef} type="text" placeholder="Username" className="p-2 border rounded" />
            <input ref={passwordRef} type="password" placeholder="Password" className="p-2 border rounded" />
            <button onClick={signup} className="bg-purple-600 text-white p-2 rounded">Sign Up</button>
        </div>
    </div>
}

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Signup />} />
        </Routes>
    </BrowserRouter>
}

export default App;