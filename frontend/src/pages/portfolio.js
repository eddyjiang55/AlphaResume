import { useState } from 'react';

export default function Step10Page({ dbFormData }) {
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setError] = useState(false);
  const [position, setPosition] = useState('');

  return (
    <>
      <div className="flex h-full">
        {/* 左侧导航栏 */}
        <div className="w-1/5 bg-alpha-blue fixed left-0 top-0 h-full flex flex-col items-center text-white">
          <div className="p-4">
            <img src="/img/new_logo.png" alt="Logo" className="w-full h-auto mb-4"/>
          </div>
          <ul className="w-full">
            <li className="p-4 flex flex-col items-center">
              <a href="/home" className="font-bold">数据总览</a>
              <ul className="mt-2 w-full">
                <li className="p-2 flex justify-center"><a href="/home/sub1">所有数据</a></li>
                <li className="p-2 flex justify-center"><a href="/home/sub2">学生列表</a></li>
              </ul>
            </li>
            <li className="p-4 flex flex-col items-center">
              <a href="/about" className="font-bold">细分数据</a>
              <ul className="mt-2 w-full">
                <li className="p-2 flex justify-center"><a href="/about/sub1">招聘季</a></li>
                <li className="p-2 flex justify-center"><a href="/about/sub2">学生去向</a></li>
              </ul>
            </li>
            <li className="p-4 flex flex-col items-center">
              <a href="/services" className="font-bold">学院数据</a>
              <ul className="mt-2 w-full">
                <li className="p-2 flex justify-center"><a href="/services/sub1">机械工程学院</a></li>
                <li className="p-2 flex justify-center"><a href="/services/sub2">土木工程学院</a></li>
              </ul>
            </li>
          </ul>
        </div>
        
        {/* 主要内容区域 */}
        <div className="w-4/5 ml-[20%] mt-100 pt-4 p-4 flex flex-wrap justify-center padding-top-100">
          <div className="bg-light-blue m-2 p-4 flex-grow min-w-[300px] max-w-[500px] flex-basis-[45%] w-[500px] h-[500px] flex justify-center items-center">Content 1</div>
          <div className="bg-light-blue m-2 p-4 flex-grow min-w-[300px] max-w-[500px] flex-basis-[45%] w-[500px] h-[500px] flex justify-center items-center">Content 2</div>
          <div className="bg-light-blue m-2 p-4 flex-grow min-w-[300px] max-w-[500px] flex-basis-[45%] w-[500px] h-[500px] flex justify-center items-center">Content 3</div>
          <div className="bg-light-blue m-2 p-4 flex-grow min-w-[300px] max-w-[500px] flex-basis-[45%] w-[500px] h-[500px] flex justify-center items-center">Content 4</div>
        </div>
      </div>
    </>
  );
}
