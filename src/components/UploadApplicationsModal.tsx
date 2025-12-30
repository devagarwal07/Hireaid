import React, { useState, useRef } from "react";

interface UploadedFile {
    id: string;
    name: string;
    size: string;
    file: File;
}

interface UploadApplicationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadAll?: (files: UploadedFile[]) => void;
}

// Icons
const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const InfoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7" stroke="#9CA3AF" strokeWidth="1.5" />
        <path d="M8 7V11M8 5V5.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const UploadIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0857A1" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="17,8 12,3 7,8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FileIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14,2 14,8 20,8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const RemoveIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Sample uploaded files for demonstration
const sampleFiles: UploadedFile[] = [
    { id: "1", name: "Aryan Resume.pdf", size: "12KB", file: new File([], "Aryan Resume.pdf") },
    { id: "2", name: "Ankit Resume.pdf", size: "12KB", file: new File([], "Ankit Resume.pdf") },
    { id: "3", name: "Ryan Resume.pdf", size: "12KB", file: new File([], "Ryan Resume.pdf") },
    { id: "4", name: "Rehan Resume.pdf", size: "12KB", file: new File([], "Rehan Resume.pdf") },
    { id: "5", name: "Clarke Resume.pdf", size: "12KB", file: new File([], "Clarke Resume.pdf") },
    { id: "6", name: "Kent Resume.pdf", size: "12KB", file: new File([], "Kent Resume.pdf") },
];

export default function UploadApplicationsModal({
    isOpen,
    onClose,
    onUploadAll,
}: UploadApplicationsModalProps): React.ReactElement | null {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(sampleFiles);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + "B";
        if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + "KB";
        return (bytes / (1024 * 1024)).toFixed(1) + "MB";
    };

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
            id: `new-${Date.now()}-${index}`,
            name: file.name,
            size: formatFileSize(file.size),
            file,
        }));

        setUploadedFiles((prev) => [...prev, ...newFiles]);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const handleRemoveFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleUploadAll = () => {
        if (onUploadAll) {
            onUploadAll(uploadedFiles);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[520px] mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Upload Applications</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                    {/* Subtitle */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-gray-600">
                            Upload single or multiple resumes in the dropbox
                        </p>
                        <InfoIcon />
                    </div>

                    {/* Upload Dropzone */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`
              border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center
              transition-colors cursor-pointer mb-4
              ${isDragging
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }
            `}
                        onClick={handleUploadClick}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFileSelect(e.target.files)}
                            multiple
                            accept=".pdf,.xls,.xlsx"
                            className="hidden"
                        />

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUploadClick();
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary text-primary text-sm font-medium hover:bg-hover-bg transition-colors mb-3"
                        >
                            <UploadIcon />
                            Upload Document
                        </button>

                        <p className="text-sm text-gray-600 text-center">
                            Upload file formats to be in PDF or XLS format
                        </p>
                        <p className="text-xs text-gray-400 text-center mt-1">
                            Maximum file size : 50KB • Maximum files allowed : 10
                        </p>
                    </div>

                    {/* Uploaded Files Grid */}
                    {uploadedFiles.length > 0 && (
                        <div className="grid grid-cols-3 gap-3">
                            {uploadedFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white"
                                >
                                    <FileIcon />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-gray-700 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-400">{file.size}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFile(file.id)}
                                        className="p-0.5 rounded hover:bg-gray-100 transition-colors flex-shrink-0"
                                    >
                                        <RemoveIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 py-4 border-t border-gray-100">
                    <button
                        onClick={handleUploadAll}
                        disabled={uploadedFiles.length === 0}
                        className={`
              px-6 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${uploadedFiles.length > 0
                                ? "bg-secondary hover:bg-secondary-hover text-white"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }
            `}
                    >
                        Upload All
                    </button>
                </div>
            </div>
        </div>
    );
}
