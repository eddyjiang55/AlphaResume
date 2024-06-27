import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '@/store/slices/userSlice';
import { useState } from 'react';
const AuthPart = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="actions flex gap-2.5 mr-18">
      {user.phoneNumber ? (
        <>
          <div
            className="relative flex items-center text-alpha-blue"
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            <span className="mr-2">Beta123</span>
            <Link href='/account/settings'>
              <Image src="/img/user-avatar.jpg" alt="User Avatar" width={40} height={40} className="rounded-full cursor-pointer" />
            </Link>
            {isDropdownVisible && (
              <div className="dropdown absolute right-0 top-full w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50"> {/* 调整mt值以确保菜单在头像下方 */}
                <ul>
                  <Link href='/account/settings'><li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">设置</li></Link>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>登出</li>
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link href='/login'>
            <button className="action-button px-7 py-2 border border-[#1D80A7] bg-[#1D80A7] text-white cursor-pointer rounded-md hover:bg-[#1D80A7] hover:text-white">登录/注册</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default AuthPart;