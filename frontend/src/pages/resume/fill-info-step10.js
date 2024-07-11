import { useState } from 'react'; // Import useState here
import Link from 'next/link';
import { useRouter } from 'next/router'; // 导入 useRouter 钩子
import { useSelector } from 'react-redux';

export async function getServerSideProps(context) {
  let dbFormData = { _id: context.query.id };
  // if (context.query.id) {
  //   // Fetch dbFormData from external API
  //   const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/improved-users/${context.query.id}/basicInformation`)
  //   const dbData = await res.json();
  //   if (dbData.data) {
  //     const displayData = dbData.data.map(data => {
  //       return {
  //         language: data.语言,
  //         proficiency: data.熟练度,
  //         certificate: data["证书/资格认证"],
  //         score: data.成绩,
  //       };
  //     });
  //     dbFormData = { _id: dbData._id, data: displayData };
  //   } else {
  //     dbFormData = { _id: dbData._id, data: null };
  //   }
  // } else {
  //   return { redirect: { destination: `/fill-info-step1`, permanent: false } }
  // }
  // Pass data to the page via props
  return { props: { dbFormData } }
}

export default function Step10Page({ dbFormData }) {
  const router = useRouter(); // 使用 useRouter 钩子获取当前路由信息
  const User = useSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState('');
  const images = [
    '/img/result-1.jpg',
    '/img/result-2.png',
    '/img/result-3.png',
    '/img/result-4.png'
  ];

  const handleSubmit = async () => {
    // Save the selected image to the database
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/improved-users/generate-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: dbFormData._id,
        phoneNumber: User.phoneNumber,
      })
    });
    router.push('/resume/generated-resume?id=' + dbFormData._id);
    // Redirect to the next page
    // router.push('/generate-resume');
  }

  return (
    <>
      <div className="flex flex-row justify-center items-start h-full">
        <div className="bg-white w-1/2 h-full flex flex-col justify-around items-stretch pt-8 pb-16 gap-y-4 overflow-y-auto">
          <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">意向岗位</h2>
          <form className='w-full flex justify-center'>
            <input className='w-[680px] mx-auto' type="text" />
          </form>
          <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">选择简历模板</h2>
          <div className="w-full max-w-[90%] grid grid-cols-2 gap-4 mx-auto">
            {images.map((image, index) => (
              <div key={index} className="col-span-1 rounded-lg border border-[#1D80A7]">
                <img
                  src={image}
                  alt={`Result ${index + 1}`}
                  className="object-cover w-full h-full rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                />
              </div>
            ))}
          </div>
          <div className="w-full max-w-[75%] flex flex-row justify-center items-center gap-x-12 mx-auto">
            <Link href={`/resume/fill-info-step9?id=${dbFormData._id}`}><button className="form-b" type="button" >
              上一步
            </button></Link>
            <button className='form-b disabled:bg-gray-500 disabled:cursor-not-allowed' type="button" onClick={handleSubmit} disabled={selectedImage === ''}>生成简历</button>
          </div>
        </div>
        <div className='w-1/2 bg-[#EDF8FD] h-full flex flex-col justify-start items-stretch gap-y-8 px-6 py-8 overflow-y-auto'>
          <h2 className="text-alpha-blue font-bold text-4xl text-center mx-auto">预览</h2>
          {selectedImage && <img className='w-fit h-full mx-auto my-16' src={selectedImage} alt="Preview" />}
        </div>
      </div>
      <style jsx>{`
      .background {
        background-color: #EDF8FD;
        min-height: 100vh;
        display: flex;
        flex-direction: row; /* 水平排列子元素 */
        flex-wrap: wrap; /* 允许子元素在必要时换行 */
        justify-content: center; /* 在主轴上居中对齐子元素 */
        align-items: flex-start; /* 在交叉轴上从顶部对齐子元素 */
      }

      .tip-info, .form-container {
        flex: 1 1 50%; /* 设置子元素基础大小为50%，允许它们增长和缩小 */
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        text-align: center;
        padding: 20px;
        box-sizing: border-box; /* 包括padding和border在内的宽度计算方式 */
      }
        .tip-info{
        }
        .{
          text-align:left;
          padding:100px;
        }
        .form-container {
          min-width:500px;
        }
        .form-heading h2,
        .form-description p {
          text-align: center;
        }
        .form-heading h2 {
          color: #1D80A7;
          font-weight:bold;
          font-size:40px;
        }
        .form-description{
          padding-bottom:20px;
        }
        .form-body form {
          display: flex;
          flex-direction: column;
          padding:0 100px;
        }
        .input-group {
          display: flex;
          justify-content: center;
          gap:100px;
          padding:10px;
        }
        .ps{
          color:grey;
          padding-bottom:10px;
        }
        .input-item {
        }
        .input-item:last-child {
        }
        label {
          margin-top: 10px;
          font-weight:bold;
          text-align: left;
        }
        input[type="title"],
        input[type="text"],
        input[type="tel"],
        input[type="email"] {
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        input[type="long"] {
          padding: 20px 10px;
          margin-top: 50px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        .form-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .form-b {
          padding: 10px 50px;
          border: none;
          border-radius: 30px;
          color: white;
          background-color: #1D80A7; /* Bootstrap 蓝色按钮颜色 */
          cursor: pointer;
        }
        .form-b:hover {
          background-color: #B2DDEE;
          color:black;
        }
        .secondNavbar {
          display: flex;
          justify-content: space-around;
          padding: 20px 0;
          background-color: #B2DDEE;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
        }
        .secondNavbar button {
          flex-grow: 1;
          padding: 10px 20px;
          border-radius: 15px;
          background: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          color:black;
        }
        .secondNavbar button:hover, .secondNavbar button:focus {
          background-color: #1D80A7;
          color:white;
        }
        .secondNavbar .active {
          background-color: #1D80A7; /* 激活按钮的背景颜色 */
          color: white; /* 激活按钮的文本颜色 */
          font-weight:bold;
        }
        .info-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px
          border-radius: 4px;
          font-weight:bold;
          margin: 30px 0;
          width:100%;
          max-width:800px;
          color:#1D80A7;
        }
        .info-text {
          font-weight:bold;
        }
        .info-button {
          display: flex;
          align-items: center;
          padding: 0 30px;
          border: #1D80A7 3px solid;
          border-radius: 30px;
          cursor: pointer;
        }
        .button-icon {
          margin-right: 8px;
          width: 50px; // 调整图标大小
          height: 50px; // 调整图标大小
        .secondNavbar {
          display: flex;
          justify-content: space-around;
          padding: 20px 0;
          background-color: #B2DDEE;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
        }
        .secondNavbar button {
          flex-grow: 1;
          padding: 10px 20px;
          border-radius: 15px;
          background: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .secondNavbar button:hover, .secondNavbar button:focus {
          background-color: #1D80A7;
        }
        .secondNavbar .active {
          background-color: #1D80A7; /* 激活按钮的背景颜色 */
          color: white; /* 激活按钮的文本颜色 */
        }
        .AddMore{
          display: flex;
          align-items: center;
          padding: 0 50px;
          border: #1D80A7 1px solid;
          border-radius: 4px;
          cursor: pointer;
        }
        .button-icon {
          margin-right: 8px;
          width: 50px; // 调整图标大小
          height: 50px; // 调整图标大小
        }
        .template-container {
          display: flex; /* 使用flex布局 */
          flex-wrap: wrap; /* 允许子元素换行 */
          gap: 10px; /* 设置元素间的间隙 */
          justify-content: center; /* 水平居中子元素 */
        }
        
        .image-container {
          width: calc(50% - 10px); /* 减去间隙的一半，确保每行两个图片容器 */
          aspect-ratio: 1 / 1; /* 使每个容器的宽高比为1:1 */
          overflow: hidden; /* 防止图片溢出容器 */
        }
        
        .image {
          width: 100%; /* 使图片宽度填满容器 */
          height: 100%; /* 使图片高度填满容器 */
          object-fit: cover; /* 裁剪图片以填充容器，不改变其宽高比 */
        }
        
        .selected {
          border: 2px solid blue; /* 选中图片的边框样式 */
        }
        
        
        
        
        
        
      `}</style>
    </>
  );
};



