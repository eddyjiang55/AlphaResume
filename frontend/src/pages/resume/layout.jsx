import Navbar from "@/components/navbar";
import ResumeNavbar from "@/components/ResumePage/ResumeNavbar";

export default function AccountLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="bg-light-blue w-full h-[calc(100vh-8rem)] flex flex-col relative">
        <ResumeNavbar />
        {children}
      </main>
    </div>
  );
}
