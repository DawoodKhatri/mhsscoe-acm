import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "antd";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <>
  <div className="relative w-full h-screen flex justify-center items-center ">
  <div className="absolute top-11 left-10 h-20 w-20  rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
  <div className="absolute top-21 left-40 h-10 w-10 animate-bounce duration-15 rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
  <div className="absolute top-11 left-40 h-10 w-10 animate-bounce duration-15 rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
  <div className="absolute top-21 right-40 h-10 w-10  rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
  <div className="absolute top-96 right-20 h-20 w-20 animate-bounce duration-15 rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
  <div className="absolute top-20 right-40 h-10 w-10 duration-15 animate-bounce rounded-full bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
  <div className="absolute top-11 h-2/3 w-4/12  rounded-full  bg-gradient-to-t from-blue-200  to-cyan-100 "></div>
    <div className="absolute top-48 items-center flex flex-col ">
     <p className="text-6xl font-bold tracking-wide mt-2 ">ACM MHSSCOE COMMITTEE</p> <br/>
     <div className="flex gap-5 mt-7">
     <Button className="ml-2 bg-[#1677ff]" type="primary">
              Join us
            </Button>
            <Button className="ml-2 bg-[#1677ff]" type="primary">
              Meet The Team
            </Button>
     {/* <button className="bg-blue-600 text-lg font-medium px-4 py-2  text-zinc-50 ">Join us</button>
     <button className="bg-blue-600 text-lg font-medium px-4 py-2  text-zinc-50">Meet The Team</button> */}
     </div>
    </div>
  </div>
  </>;
}
