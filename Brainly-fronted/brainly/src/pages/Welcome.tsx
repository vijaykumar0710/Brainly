import { useNavigate } from "react-router-dom";

export const Welcome = () => {
    const navigate = useNavigate();

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
                    <button onClick={() => navigate('/signin')} className="text-gray-100 font-serif hover:text-cyan-300 transition-colors">Sign in</button>
                    <button onClick={() => navigate('/signup')} className="bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-900 px-6 py-2 rounded-lg font-semibold transition-all font-serif">
                        Sign up
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
                {/* Greeting Message */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-6xl md:text-7xl font-black text-white mb-6 drop-shadow-lg font-serif">
                        Welcome to <span className="text-cyan-300">BRAINLY</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-100 font-serif mb-4">
                        Your Personal Knowledge Hub
                    </p>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Save, organize, and share your thoughts, links, and ideas in one beautiful place. Join thousands of learners building their digital brain today.
                    </p>
                </div>

                {/* Animated Arrow and CTA */}
                <div className="flex flex-col items-center gap-8 animate-bounce">
                    {/* Arrow */}
                    <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-cyan-300 animate-bounce" style={{animationDuration: '1.5s'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>

                    {/* CTA Button */}
                    <button 
                        onClick={() => navigate('/signup')}
                        className="bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-900 px-12 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 font-serif"
                    >
                        Let's Get Started! 🚀
                    </button>
                </div>

                {/* Features Preview */}
                <div className="absolute bottom-16 left-0 right-0 px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                            <div className="text-4xl mb-3">💾</div>
                            <h3 className="text-white font-bold font-serif mb-2">Save Everything</h3>
                            <p className="text-gray-200 text-sm">Store links, notes, and ideas effortlessly</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                            <div className="text-4xl mb-3">🎯</div>
                            <h3 className="text-white font-bold font-serif mb-2">Stay Organized</h3>
                            <p className="text-gray-200 text-sm">Categorize and find your content instantly</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                            <div className="text-4xl mb-3">🔗</div>
                            <h3 className="text-white font-bold font-serif mb-2">Share Easily</h3>
                            <p className="text-gray-200 text-sm">Share your brain with anyone, anytime</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
