import type { FC } from "react";

export interface NotificationDropdownProps {
  onClose?: () => void;
}

export const NotificationDropdown: FC<NotificationDropdownProps> = () => {
  return (
    <div className="relative mt-3">
      {/* pointer */}
      <div className="absolute right-8 -top-2 h-4 w-4 rotate-45 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.06)]" />

      <div className="relative w-[380px] rounded-2xl bg-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] border border-border-card overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <span className="text-[15px] font-semibold text-text-primary">Notifications</span>
          <button
            type="button"
            className="text-xs font-medium text-primary hover:text-[#064074]"
          >
            Mark All As Read
          </button>
        </div>

        {/* tabs */}
        <div className="flex items-center gap-6 px-5 border-b border-border-card text-sm font-medium">
          <button
            type="button"
            className="relative flex items-center gap-2 py-3 text-text-primary"
          >
            <span className="inline-flex h-5 min-w-[22px] items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white mr-1">
              1
            </span>
            All
            <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-primary" />
          </button>

          <button
            type="button"
            className="py-3 text-text-secondary hover:text-text-primary"
          >
            Inbox
          </button>

          <button
            type="button"
            className="py-3 text-text-secondary hover:text-text-primary"
          >
            Mentions
          </button>
        </div>

        {/* list */}
        <div className="max-h-[360px] overflow-y-auto divide-y divide-[#F3F4F6]">
          {/* item 1 */}
          <div className="flex items-start gap-3 px-5 py-4 bg-muted-bg">
            <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden" />
            <div className="flex-1 text-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[13px] leading-5 font-semibold text-text-primary">
                  Joe Smalls has been added as Assistant Interviewer for Samuel Baker
                </p>
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              </div>
              <p className="mt-1 text-[12px] leading-4 text-text-secondary">
                joe@hireaide.co has accepted your invitation for Samuel Baker&apos;s Interview
              </p>
              <p className="mt-2 text-[11px] text-text-placeholder">Today at 7:41 AM</p>
            </div>
          </div>

          {/* item 2 */}
          <div className="flex items-start gap-3 px-5 py-4">
            <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden" />
            <div className="flex-1 text-sm">
              <p className="text-[13px] leading-5 font-semibold text-text-primary">
                2 new comments from John and Phillip
              </p>
              <p className="mt-1 text-[12px] leading-4 text-text-secondary">
                You have 2 new comments from John Doe and Philip Sam on Samuel&apos;s report
              </p>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E0ECFF] px-3 py-1 text-[11px] font-medium text-primary hover:bg-[#D0E4FF]"
                >
                  <span className="inline-block h-[14px] w-[14px] rounded bg-primary/90" />
                  See Comment
                </button>
                <span className="text-[11px] text-text-placeholder">Yesterday at 10:12 AM</span>
              </div>
            </div>
          </div>

          {/* item 3 */}
          <div className="flex items-start gap-3 px-5 py-4">
            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="h-5 w-5 rounded-lg bg-[#E5E7EB]" />
            </div>
            <div className="flex-1 text-sm">
              <p className="text-[13px] leading-5 font-semibold text-text-primary">
                Your account has been activated
              </p>
              <p className="mt-1 text-[12px] leading-4 text-text-secondary">
                Company admin has provided you access for the Interviewer role.
              </p>
              <p className="mt-2 text-[11px] text-text-placeholder">Last Friday at 8:40 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
