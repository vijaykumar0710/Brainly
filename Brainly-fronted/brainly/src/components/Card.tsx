import { TrashIcon } from "../icons";
import axios from "axios";
import { BACKEND_URL } from "../config"; // Make sure you have this import

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
    contentId: string;
    onDelete: () => void;
}

export function Card({ title, link, type, contentId, onDelete }: CardProps) {
    async function deleteContent() {
        await axios.delete(`${BACKEND_URL}/api/v1/content`, {
            data: { contentId },
            headers: { "Authorization": localStorage.getItem("token") }
        });
        onDelete();
    }

    return (
        <div className="p-4 bg-white rounded-md border-gray-200 border max-w-72 min-h-48 min-w-72 shadow-md">
            <div className="flex justify-between font-medium">
                <div className="flex items-center text-md">
                    {title}
                </div>
                <div className="cursor-pointer text-gray-500 hover:text-red-500" onClick={deleteContent}>
                    <TrashIcon />
                </div>
            </div>
            <div className="pt-4">
                {type === "youtube" && <iframe 
                    className="w-full rounded-md" 
                    // FIX: This logic now handles both standard links and short youtu.be links
                    src={link.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen>
                </iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>}
            </div>
        </div>
    )
}