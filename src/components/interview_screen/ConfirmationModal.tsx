import { Fragment } from 'react';
import { createPortal } from 'react-dom';

export interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ConfirmationModal({ open, onClose, onConfirm }: ConfirmationModalProps) {
    if (!open) return null;

    return createPortal(
        <Fragment>
            <div className="fixed inset-0 z-[9999] bg-slate-900/40" onClick={onClose} />
            <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4 pointer-events-none">
                <div className="pointer-events-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF4EB] text-[#C05621]">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M6 3V6.5M6 8.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h2 className="text-base font-semibold text-slate-900">Confirmation</h2>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <p className="text-sm text-slate-600 mb-6">
                        By sharing the screen you are entering into focused view mode, are you sure you want to continue?
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="rounded-full bg-[#0857A1] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(8,87,161,0.3)] hover:bg-[#064684]"
                        >
                            Share Screen
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>,
        document.body
    );
}
