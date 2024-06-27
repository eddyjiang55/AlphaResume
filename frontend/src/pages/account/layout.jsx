import Navbar from "@/components/navbar";
import AccountPageSideBar from "@/components/AccountPage/AccountSideBar";

export default function AccountLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="flex h-[calc(100vh-6rem)] bg-light-blue">
        <div className="w-52 bg-[#B2DDEE]">
          <AccountPageSideBar />
        </div>
        <div className="flex-1 flex flex-col items-center">{children}</div>
      </div>
    </div>
  );
}
