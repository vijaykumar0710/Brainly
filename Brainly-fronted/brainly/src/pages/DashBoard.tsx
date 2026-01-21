import { useState } from "react";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon, ShareIcon } from "../icons";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, refresh } = useContent();

    async function handleShare() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: true }, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });
            alert("Link: " + `http://localhost:5173/share/${response.data.hash}`);
        } catch(e) { console.log(e); }
    }

    return (
        <div className="min-h-screen relative overflow-hidden" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/55"></div>
            
            {/* Animated overlay elements */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{animationDuration: '3s'}}></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{animationDuration: '4s', animationDelay: '1s'}}></div>

            {/* Header/Navigation Bar */}
            <div className="relative z-20 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="w-full px-8 py-6">
                    <div className="flex justify-between items-center">
                        {/* Left - BRAINLY Title */}
                        <div>
                            <h1 className="text-5xl font-black text-cyan-300 tracking-wider drop-shadow-lg font-serif">BRAINLY</h1>
                        </div>
                        
                        {/* Right - Action Buttons */}
                        <div className="flex gap-3">
                            <button onClick={() => setModalOpen(true)} className="flex gap-2 items-center bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-cyan-500/50 font-serif">
                                <PlusIcon /> Add Content
                            </button>
                            <button onClick={handleShare} className="flex gap-2 items-center bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50 font-serif">
                                <ShareIcon /> Share Brain
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <CreateContentModal open={modalOpen} onClose={() => { setModalOpen(false); refresh(); }} />
            <div className="relative z-10 flex-1 w-full px-8 py-12">
                {contents && contents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {contents?.map(({ type, link, title, _id }: any) => 
                            <Card key={_id} type={type} link={link} title={title} contentId={_id} onDelete={refresh} />
                        )}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-200 text-lg">No content yet. Start by adding your first item!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Dashboard;