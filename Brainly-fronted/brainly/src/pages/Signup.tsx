import { useRef } from "react"
import { Button } from "../components/ui/Button";
import { InputBox } from "../components/ui/InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            });
            alert("You have signed up!");
            navigate("/signin");
        } catch (error: any) {
            console.error("Signup error:", error);
            alert("Signup failed: " + (error.response?.data?.message || error.message));
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
                    <span className="text-gray-100 font-serif">Already have an account?</span>
                    <a href="/signin" className="bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all font-serif">
                        Sign in
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex justify-center items-center relative z-10">
                <div className="bg-white/15 backdrop-blur-xl rounded-2xl border border-white/30 p-10 shadow-2xl w-96">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-cyan-300">Join the BRAINLY community</p>
                    </div>
                    
                    <InputBox reference={usernameRef} placeholder="username" /> 
                    <InputBox reference={passwordRef} placeholder="password" /> 
                    
                    <div className="flex justify-center pt-6 mt-8">
                        <Button onClick={signup} variant="secondary" size="md" text="Signup" fullwidth/>
                    </div>
                </div>
            </div>
        </div>
    )
}