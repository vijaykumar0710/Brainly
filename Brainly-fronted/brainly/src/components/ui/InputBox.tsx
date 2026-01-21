interface InputBoxProps {
    placeholder: string;
    reference?: any; // Using 'any' loosely here to accept useRef, typically RefObject<HTMLInputElement>
}

export function InputBox({ placeholder, reference }: InputBoxProps) {
    return (
        <div>
            <input
                ref={reference}
                placeholder={placeholder}
                type={"text"}
                className="px-4 py-2 border rounded m-2 min-w-48 outline-none focus:ring-2 focus:ring-purple-300"
            />
        </div>
    );
}