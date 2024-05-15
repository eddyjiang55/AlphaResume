// pages/account.js
import Navbar from '../components/navbar';
import Image from 'next/image';

const Account = () => {
  return (
    <div>
      <Navbar />
      <div className="account-settings">
        <div className="sidebar">
          <ul className="sidebar-list">
            <li className="sidebar-item">账户设置</li>
            <li className="sidebar-item">我的会员</li>
          </ul>
        </div>
        <div className="content">
          <h2 className="content-title">账户设置</h2>
          <div className="profile-pic-container">
            <div className="profile-pic">
              <Image
                src="/img/user-avatar.jpg" // Replace with your profile picture path
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="form-container">
            <form>
              <div className="form-group">
                <label>用户名</label>
                <input type="text" value="Beta123" readOnly />
              </div>
              <div className="form-group">
                <label>密码</label>
                <input type="password" value="********" readOnly />
              </div>
              <div className="form-group">
                <label>手机号码</label>
                <input type="text" value="1234567890" readOnly />
              </div>
              <div className="form-group">
                <label>邮箱</label>
                <input type="email" placeholder="添加" />
              </div>
              <div className="form-group">
                <label>微信号</label>
                <input type="text" placeholder="添加" />
              </div>
              <button type="submit">保存更改</button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .account-settings {
          display: flex;
          color:#1D80A7;
        }
        .sidebar {
          width: 200px;
          padding: 0px;
          background: #B2DDEE;
        }        
        .sidebar-title, .sidebar-item {
          text-align: center;
          width: 100%;
        }
        .sidebar-item {
          padding: 20px;
          cursor: pointer;
        }
        .sidebar-item:hover {
          background-color: #EDF8FD;
        }
        h2{
          font-size:20px;
        }
        .content {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background:#EDF8FD;
        }
        .content-title {
          align-self: flex-start;
          margin-bottom: 20px;
        }
        .profile-pic-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .profile-pic {
          border-radius: 50%;
          overflow: hidden;
        }
        .form-container {
          width: 100%;
          max-width: 400px;
          padding:50px 0 200px 0;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .form-group {
          display: flex;
          align-items: center;
        }
        label {
          width: 80px;
          font-size: 14px;
          margin-right: 10px;
        }
        input {
          flex: 1;
          padding: 8px;
          color:black;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 8px 10px;
          background-color: #1D80A7;
          color: white;
          cursor: pointer;
          border-radius: 50px;
        }
      `}</style>
    </div>
  );
};

export default Account;
