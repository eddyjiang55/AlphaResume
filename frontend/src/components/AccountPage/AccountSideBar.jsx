import Link from "next/link";
import { useRouter } from "next/router";

const AccountPageSideBar = () => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <ul className="flex flex-col justify-center items-center gap-y-2 first:mt-4">
      <li key="settings" className="w-full px-4">
        {" "}
        <Link href="/account/settings">
          <button
            className={`text-center text-xl text-alpha-blue w-full rounded-lg py-5 cursor-pointer hover:bg-sky-300 ${
              router.pathname === "/account/settings" ? "bg-sky-300" : ""
            }`}
          >
            账户设置
          </button>
        </Link>
      </li>
      <li key="membership" className="w-full px-4">
        <Link href="/account/membership">
          <button
            className={`text-center text-xl text-alpha-blue w-full rounded-lg py-5 cursor-pointer hover:bg-sky-300 ${
              router.pathname === "/account/membership" ? "bg-sky-300" : ""
            }`}
          >
            我的会员
          </button>
        </Link>
      </li>
    </ul>
  );
};

export default AccountPageSideBar;
