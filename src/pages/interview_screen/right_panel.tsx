import RightSideBar from "@/components/interview_screen/RightSideBar.tsx";

export default function RightPanel() {
  const candidate = {
    name: "Samuel Baker",
    role: "Frontend",
    time: "10:05",
  };
  
  return <RightSideBar candidate={candidate} />;
}
