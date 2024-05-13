import React from 'react';
import { useAuth } from '../components/AuthContext';

const UserProfile = () => {
  const { phoneNumber } = useAuth();

  return (
    <div>
      {phoneNumber ? <p>手机号: {phoneNumber}</p> : <p>用户未登录</p>}
    </div>
  );
};

export default UserProfile;
