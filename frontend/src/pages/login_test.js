import React from 'react';
import { useAuth } from '../components/AuthContext';

const UserProfile = () => {
  const { phoneNumber, logout } = useAuth();

  return (
      <div>
          {phoneNumber ? (
              <>
                  <p>手机号: {phoneNumber}</p>
                  <button onClick={logout}>注销</button>
              </>
          ) : (
              <p>用户未登录</p>
          )}
      </div>
  );
};

export default UserProfile;
