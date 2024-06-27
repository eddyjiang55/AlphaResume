import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllResumeCards } from "@/store/features/resumeSlice";
import Toast from "@/components/Toast/Toast";
import Modal from "@/components/Modal/Modal";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    setOpen(false);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/api/account/clear-history/" +
          User.id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setDeleted(true);
        setMessage("所有历史记录已删除");
        dispatch(deleteAllResumeCards());
      } else {
        setDeleted(true);
        setMessage("删除历史记录失败");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (deleted) {
      setTimeout(() => {
        setDeleted(false);
      }, 3000);
    }
  }, [deleted]);

  return (
    <>
      <h2 className="text-3xl text-alpha-blue self-start my-5 ml-6">
        账户设置
      </h2>
      <div className="flex justify-center mb-5 mt-10">
        <div className="rounded-full overflow-hidden">
          <Image
            src="/img/user-avatar.jpg" // Replace with your profile picture path
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="w-full max-w-xl py-12 mx-auto flex flex-col justify-center items-center gap-y-12">
        <form className="w-full flex flex-col gap-4">
          <div className="flex items-center">
            <label className="w-20 text-sm mr-2.5">用户名</label>
            <input
              type="text"
              value="Beta123"
              readOnly
              className="flex-1 p-2 text-black text-base border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="w-20 text-sm mr-2.5">密码</label>
            <input
              type="password"
              value="********"
              readOnly
              className="flex-1 p-2 text-black text-base border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="w-20 text-sm mr-2.5">手机号码</label>
            <input
              type="text"
              value="1234567890"
              readOnly
              className="flex-1 p-2 text-black text-base border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="w-20 text-sm mr-2.5">邮箱</label>
            <input
              type="email"
              placeholder="添加"
              className="flex-1 p-2 text-black text-base border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="w-20 text-sm mr-2.5">微信号</label>
            <input
              type="text"
              placeholder="添加"
              className="flex-1 p-2 text-black text-base border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 py-2 bg-[#1D80A7] text-white cursor-pointer rounded-full"
          >
            保存更改
          </button>
        </form>
        <div className="w-full flex flex-row justify-between items-center">
          <p className="text-black text-base">清除所有过往简历记录： </p>
          <button
            className="text-white text-base rounded-lg bg-red-500 px-4 py-2"
            onClick={() => setOpen(true)}
          >
            删除记录
          </button>
        </div>
      </div>
      {open && (
        <Modal
          message="确定要删除所有历史记录吗？"
          handleClick={handleDelete}
        />
      )}
      {deleted && <Toast message={message} />}
    </>
  );
};

export default AccountSettings;
