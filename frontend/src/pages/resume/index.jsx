import React from "react";
import Link from "next/link";

import Navbar from "@/components/navbar";
import Card from "@/components/card";

const SelectCommunicationMethod = (props) => {
  return (
    <>
      <div className="w-full flex h-full items-start flex-col justify-start bg-white">
        <Navbar></Navbar>
        <section className="p-10 w-full max-w-[1440px] flex items-center justify-center gap-16 mx-auto mt-20">
          <div className="flex w-80 h-auto items-center flex-col gap-y-4">
            <div className="">
              <Card rootClassName="card-root-class-name5"></Card>
            </div>
            <Link href="/ai-assistant-select">
              <span className="bg-[#14a9ff] text-black button">选择</span>
            </Link>
          </div>
          <div className="flex w-80 h-auto items-center flex-col gap-y-4">
            <Card
              Header="手动填写"
              image_src="https://images.unsplash.com/photo-1579705379005-1cdcdc76f793?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE5fHx0ZXh0fGVufDB8fHx8MTcwMDI4MTAyMXww&amp;ixlib=rb-4.0.3&amp;w=1500"
              image_src1="https://images.unsplash.com/photo-1579705379005-1cdcdc76f793?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE5fHx0ZXh0fGVufDB8fHx8MTcwMDI4MTAyMXww&amp;ixlib=rb-4.0.3&amp;h=300"
              rootClassName="card-root-class-name7"
            ></Card>
            <Link href="/resume/manualy">
              <span className="bg-[#14a9ff] text-white button">选择</span>
            </Link>
          </div>
          <div className="flex w-80 h-auto items-center flex-col gap-y-4">
            <Card
              Header="一键速投"
              image_src="https://images.unsplash.com/photo-1579705379005-1cdcdc76f793?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE5fHx0ZXh0fGVufDB8fHx8MTcwMDI4MTAyMXww&amp;ixlib=rb-4.0.3&amp;w=1500"
              image_src1="https://images.unsplash.com/photo-1655271916005-12152fe420a1?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE1NHx8ZmFzdHxlbnwwfHx8fDE3MDE0ODY4NzF8MA&amp;ixlib=rb-4.0.3&amp;h=300"
              rootClassName="card-root-class-name6"
            ></Card>
            <span className="bg-[#14a9ff] text-black button">选择</span>
          </div>
        </section>
      </div>
    </>
  );
};

export default SelectCommunicationMethod;
