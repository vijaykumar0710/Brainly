import { useRef } from "react"
import { Button } from "../components/ui/Button";
import { InputBox } from "../components/ui/InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
  
    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            })
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Signin error:", error);
            alert("Signin failed: " + (error.response?.data?.message || error.message));
        }
    }

    return (
        <div className="h-screen w-screen relative overflow-hidden" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
            
            {/* Animated overlay elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-300/15 rounded-full blur-3xl animate-pulse" style={{animationDuration: '3s'}}></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
            
            {/* Navigation Bar */}
            <div className="relative z-20 w-full px-8 py-6 flex justify-between items-center">
                {/* Left - BRAINLY Title */}
                <div>
                    <h1 className="text-5xl font-black text-cyan-300 drop-shadow-lg tracking-wider font-serif">BRAINLY</h1>
                </div>
                
                {/* Right - Navigation */}
                <div className="flex gap-4 items-center">
                    <span className="text-gray-100 font-serif">Don't have an account?</span>
                    <a href="/signup" className="bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-900 px-6 py-2 rounded-lg font-semibold transition-all font-serif">
                        Sign up
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex justify-center items-center relative z-10">
                <div className="bg-white/15 backdrop-blur-xl rounded-2xl border border-white/30 p-10 shadow-2xl w-96">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-cyan-300">Sign in to your account</p>
                    </div>
                    
                    <InputBox placeholder="username" reference={usernameRef} /> 
                    <InputBox placeholder="password" reference={passwordRef}/> 
                    
                    <div className="flex justify-center pt-6 mt-8"> 
                        <Button onClick={signin} variant="secondary" size="md" text="Signin" fullwidth/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin