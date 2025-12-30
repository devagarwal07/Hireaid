import { Fragment } from 'react';

export interface DisclaimerModalProps {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export function DisclaimerModal({ open, onClose, onAgree }: DisclaimerModalProps) {
  if (!open) return null;

  return (
    <Fragment>
      <div className="fixed inset-0 z-40 bg-slate-900/40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-warning-light text-warning-text">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2.5C6.41015 2.5 3.5 5.41015 3.5 9C3.5 12.5899 6.41015 15.5 10 15.5C13.5899 15.5 16.5 12.5899 16.5 9C16.5 5.41015 13.5899 2.5 10 2.5ZM10 7C10.4142 7 10.75 7.33579 10.75 7.75V11.25C10.75 11.6642 10.4142 12 10 12C9.58579 12 9.25 11.6642 9.25 11.25V7.75C9.25 7.33579 9.58579 7 10 7ZM10 13.5C9.44772 13.5 9 13.9477 9 14.5C9 15.0523 9.44772 15.5 10 15.5C10.5523 15.5 11 15.0523 11 14.5C11 13.9477 10.5523 13.5 10 13.5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-slate-900">Disclaimer</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                This AI Assistant may participate in and analyze your interview responses to
                provide feedback and help the interviewer make informed decisions. Please
                only share information you are comfortable disclosing.
              </p>
            </div>
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={onAgree}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(8,87,161,0.4)] hover:bg-primary-dark"
            >
              I Agree
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
