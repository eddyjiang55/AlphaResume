import Navbar from "@/components/navbar";
import ResumeNavbar from "@/components/ResumePage/ResumeNavbar";

export default function AccountLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="bg-light-blue w-full flex flex-col relative h-screen">
        <ResumeNavbar />
        {children}
      </main>
    </div>
  );
}
