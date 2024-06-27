import Link from "next/link";
import { useRouter } from "next/router";

const AccountPageSideBar = () => {
  const router = useRouter();
  return (
    <ul>
      <Link href="/account/settings"> <li key="settings" className={`text-center w-full py-5 cursor-pointer hover:bg-[#cdefff] ${router.pathname.includes("settings")}`}>账户设置</li></Link>
      <Link href="/account/membership"> <li key="membership" className={`text-center w-full py-5 cursor-pointer hover:bg-[#cdefff] ${router.pathname.includes("membership")}`}>我的会员</li></Link>
    </ul>
  );
};

export default AccountPageSideBar;