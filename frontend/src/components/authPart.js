import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '@/store/slices/userSlice';

const AuthPart = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="actions flex gap-2.5 mr-18">
      {user.phoneNumber ? (
        <>
          <div className="relative">
            <Link href='/personal_info'>
              <Image src="/img/user-avatar.jpg" alt="User Avatar" width={40} height={40} className="rounded-full cursor-pointer" />
            </Link>
            <div className="dropdown absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleSettings}>设置</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>登出</li>
              </ul>
            </div>
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