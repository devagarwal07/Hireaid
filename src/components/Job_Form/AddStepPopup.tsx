import { useRef, useEffect } from "react";

interface AddStepPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectType: (type: "Interview" | "MCQ" | "Custom Test") => void;
    anchorRef?: React.RefObject<HTMLButtonElement>;
}

export default function AddStepPopup({
    isOpen,
    onClose,
    onSelectType,
}: AddStepPopupProps) {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={popupRef}
            className="absolute left-0 bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-200 w-56 z-20"
        >
            <div className="p-3">
                <p className="text-xs text-gray-400 mb-2">Chip 0</p>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Select Type of Assessment
                </h3>
                <div className="space-y-1">
                    <button
                        onClick={() => {
                            onSelectType("Interview");
                            onClose();
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
                    >
                        Interview
                    </button>
                    <button
                        onClick={() => {
                            onSelectType("MCQ");
                            onClose();
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
                    >
                        MCQ
                    </button>
                    <button
                        onClick={() => {
                            onSelectType("Custom Test");
                            onClose();
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
                    >
                        Custom Test
                    </button>
                </div>
            </div>
        </div>
    );
}
