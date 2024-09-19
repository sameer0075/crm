import { X } from "lucide-react";
import React, { useState } from "react";

const EmailComposer: React.FC = () => {
    const [to, setTo] = useState<string>("");
    const [cc, setCc] = useState<string>("");
    const [bcc, setBcc] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [attachments, setAttachments] = useState<File[]>([]);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [showCc, setShowCc] = useState<boolean>(false);
    const [showBcc, setShowBcc] = useState<boolean>(false);



    const handleSend = () => {
        console.log({
            to,
            cc,
            bcc,
            subject,
            body,
            attachments,
        });
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleResize = () => {
        setIsFullScreen(!isFullScreen);
    };

    const handleDelete = () => {
        setTo("");
        setCc("");
        setBcc("");
        setSubject("");
        setBody("");
        setAttachments([]);
        setIsVisible(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setAttachments((prev) => [...prev, ...files]);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const imageFiles = Array.from(e.target.files);
            setAttachments((prev) => [...prev, ...imageFiles]);
        }
    };

    if (!isVisible) return null;

    return (
        <div
            className={`${isFullScreen ? "w-full h-screen" : "max-w-[600px] w-[600px]"} mx-auto bg-white shadow-lg rounded-lg mt-10 border relative`}
        >
            {/* Header */}
            <div className="border-b p-2 flex justify-between items-center bg-[#424242] rounded-tl-[8px] rounded-br-none rounded-tr-[8px] rounded-bl-none">
                <h2 className="text-[14px] font-medium text-white">New Message</h2>
                <div className="space-x-3 flex">
                    <button onClick={handleMinimize}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2.75 11.2085H12.75V13.2085H2.75V11.2085Z" fill="white" fillOpacity="0.6" />
                        </svg>
                    </button>
                    <button onClick={handleResize}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13 7.44444V3H8.55556L10.3833 4.82778L4.82778 10.3833L3 8.55556V13H7.44444L5.61667 11.1722L11.1722 5.61667L13 7.44444Z" fill="white" fillOpacity="0.6" />
                        </svg>
                    </button>
                    <button onClick={handleClose} className="text-[#FFFFFF99] ">
                        <X size={16} />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* Email inputs */}
                    <div className="p-2">
                        <div className="flex items-center">
                            <label htmlFor="to" className="w-18 text-[#0000008A] font-medium">Recipients</label>
                            <input
                                type="email"
                                id="to"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                placeholder=""
                                className="w-full p-1 focus:outline-none focus:ring-none"
                            />
                            {/* Cc and Bcc buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowCc(!showCc)}
                                    className="text-[#0000008A] hover:underline"
                                >
                                    Cc
                                </button>
                                <button
                                    onClick={() => setShowBcc(!showBcc)}
                                    className="text-[#0000008A] hover:underline"
                                >
                                    Bcc
                                </button>
                            </div>
                        </div>

                        {/* Cc field */}
                        {showCc && (
                            <div className="flex items-center space-x-2">
                                <label htmlFor="cc" className="w-16 text-[#0000008A] font-medium">Cc</label>
                                <input
                                    type="email"
                                    id="cc"
                                    value={cc}
                                    onChange={(e) => setCc(e.target.value)}
                                    placeholder=""
                                    className="w-full p-1 focus:outline-none focus:ring-none"
                                />
                            </div>
                        )}

                        {/* Bcc field */}
                        {showBcc && (
                            <div className="flex items-center">
                                <label htmlFor="bcc" className="w-16 text-[#0000008A] font-medium">Bcc</label>
                                <input
                                    type="email"
                                    id="bcc"
                                    value={bcc}
                                    onChange={(e) => setBcc(e.target.value)}
                                    placeholder=""
                                    className="w-full p-1 focus:outline-none focus:ring-none"
                                />
                            </div>
                        )}

                        <div className="flex items-center border-b border-t border-gray-300">
                            <label htmlFor="subject" className="w-16 text-[#0000008A] font-medium">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder=""
                                className="w-full p-2 focus:outline-none focus:ring-none"
                            />
                        </div>

                        <div>
                            <textarea
                                id="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Email here"
                                className="w-full h-[400px] p-2 focus:outline-none focus:ring-none overflow-y-auto"
                                style={{ resize: 'none', }}
                            ></textarea>
                        </div>

                        {/* Footer */}
                        <div className="border-t p-2 flex justify-between">
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleSend}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded"
                                >
                                    Send
                                </button>
                                {/* Attachment buttons */}
                                <div className="flex space-x-2">
                                    <label className="flex items-center cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M16.1248 6.49984V17.0415C16.1248 19.0673 14.484 20.7082 12.4582 20.7082C10.4323 20.7082 8.7915 19.0673 8.7915 17.0415V5.58317C8.7915 4.31817 9.81817 3.2915 11.0832 3.2915C12.3482 3.2915 13.3748 4.31817 13.3748 5.58317V15.2082C13.3748 15.7123 12.9623 16.1248 12.4582 16.1248C11.954 16.1248 11.5415 15.7123 11.5415 15.2082V6.49984H10.1665V15.2082C10.1665 16.4732 11.1932 17.4998 12.4582 17.4998C13.7232 17.4998 14.7498 16.4732 14.7498 15.2082V5.58317C14.7498 3.55734 13.109 1.9165 11.0832 1.9165C9.05734 1.9165 7.4165 3.55734 7.4165 5.58317V17.0415C7.4165 19.8282 9.6715 22.0832 12.4582 22.0832C15.2448 22.0832 17.4998 19.8282 17.4998 17.0415V6.49984H16.1248Z" fill="black" fillOpacity="0.54" />
                                        </svg>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M20.25 18.4167V5.58333C20.25 4.575 19.425 3.75 18.4167 3.75H5.58333C4.575 3.75 3.75 4.575 3.75 5.58333V18.4167C3.75 19.425 4.575 20.25 5.58333 20.25H18.4167C19.425 20.25 20.25 19.425 20.25 18.4167ZM8.79167 13.375L11.0833 16.1342L14.2917 12L18.4167 17.5H5.58333L8.79167 13.375Z" fill="black" fillOpacity="0.54" />
                                        </svg>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                            <button onClick={handleDelete}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6.50016 18.4167C6.50016 19.425 7.32516 20.25 8.3335 20.25H15.6668C16.6752 20.25 17.5002 19.425 17.5002 18.4167V7.41667H6.50016V18.4167ZM18.4168 4.66667H15.2085L14.2918 3.75H9.7085L8.79183 4.66667H5.5835V6.5H18.4168V4.66667Z" fill="black" fillOpacity="0.54" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </>
            )}

            {isMinimized && (
                <div className="text-center text-gray-500 ">
                </div>
            )}
        </div>
    );
};

export default EmailComposer;
