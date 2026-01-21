import { useRef, useState } from "react";
import { CrossIcon } from "../icons";
import axios from "axios";
import { BACKEND_URL } from "../config";

const ContentType = {
    Youtube: "youtube",
    Twitter: "twitter"
};

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<string>(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const token = localStorage.getItem("token");

        if (!title || !link) return alert("Please fill details");

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link, title, type
            }, {
                headers: { "Authorization": token }
            });
            onClose();
        } catch (e) {
            alert("Error adding content");
        }
    }

    if (!open) return null;

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-slate-800/60 flex justify-center items-center">
            <div className="flex flex-col justify-center">
                <span className="bg-white p-8 rounded-md shadow-lg min-w-87.5">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer p-1">
                            <CrossIcon />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-2">
                        <input ref={titleRef} placeholder="Title" className="px-4 py-2 border rounded" />
                        <input ref={linkRef} placeholder="Link" className="px-4 py-2 border rounded" />
                    </div>
                    <div className="mt-6 flex gap-2">
                        <button onClick={() => setType(ContentType.Youtube)} className={`px-4 py-2 rounded ${type === ContentType.Youtube ? "bg-purple-200" : "bg-gray-100"}`}>Youtube</button>
                        <button onClick={() => setType(ContentType.Twitter)} className={`px-4 py-2 rounded ${type === ContentType.Twitter ? "bg-purple-200" : "bg-gray-100"}`}>Twitter</button>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button onClick={addContent} className="bg-purple-600 text-white px-8 py-2 rounded">Submit</button>
                    </div>
                </span>
            </div>
        </div>
    );
}