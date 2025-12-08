import JobSidebar from "@/components/Job_Form/JobSidebar";
import JobOverview from "@/components/Job_Form/JobOverview";
import Button from "@/components/Button";

export default function JobFormLayout() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex gap-6">
        <aside className="w-64">
          <JobSidebar />
        </aside>

        <section className="flex-1">
          <JobOverview />
        </section>
      </div>

      {/* bottom action bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-white mt-6 p-4 rounded-t-xl shadow-inner flex justify-end gap-4">
        <button className="px-4 py-2 rounded-md border">Save as Draft</button>
        <Button variant="primary">Next</Button>
      </div>
    </div>
  );
}
