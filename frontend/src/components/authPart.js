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
          <Link href='/personal_info'>
            <Image src="/img/user-avatar.jpg" alt="User Avatar" width={40} height={40} className="rounded-full" />
          </Link>
          <button className="action-button px-7 py-2 border border-[#1D80A7] bg-white text-[#1D80A7] cursor-pointer rounded-md hover:bg-[#1D80A7] hover:text-white" onClick={handleLogout}>登出</button>
        </>
      ) : (
        <>
          <Link href='/login'>
            <button className="action-button px-7 py-2 border border-[#1D80A7] bg-white text-[#1D80A7] cursor-pointer rounded-md hover:bg-[#1D80A7] hover:text-white">登录</button>
          </Link>
          <button className="action-button px-7 py-2 border border-[#1D80A7] bg-white text-[#1D80A7] cursor-pointer rounded-md hover:bg-[#1D80A7] hover:text-white">获取</button>
        </>
      )}
    </div>
  );
}

export default AuthPart;