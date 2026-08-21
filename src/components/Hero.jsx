import { Download } from "lucide-react";
import profile from "../assets/profiles/pfp.jpg";
const Hero = () => {
  return (
    <div className="my-5 mt-35 flex items-start gap-8">
      <div className="flex-1 pt-10">
        <h1 className="text-4xl font-bold text-black">
          PATRICK <span className="hero-outline">LAMBINO</span> 
            <p className="mb-5 mt-2 text-[1rem] font-semibold">Software Developer</p>

          <div className="text-justify my-10 gap-2">
            <p className="text-[1.1rem] font-normal indent-10">Hi, I'm a software developer with experience in building web applications. I have a passion for creating innovative solutions and continuously learning new technologies. My goal is to contribute to impactful projects and collaborate with talented teams to deliver exceptional software products. 
            </p>
            <p className="text-[1.1rem] font-normal indent-10 mt-2">
                I graduated from Quezon City University with a degree in Information Technology <b>(Cum Laude)</b> and have worked on various projects that have honed my skills in front-end and back-end development. 
            </p>
          </div>
          

        </h1>
         <button className="flex items-center gap-2 cursor-pointer rounded-2xl border px-6 py-1 hover:cursor-pointer hover:bg-black hover:text-white transition duration-300">
            Download CV
            <Download className="w-4 h-4" />
        </button>
      </div>

      <div className="shrink-0 pt-4">
        <img
          src={profile}
          alt="Patrick Lambino"
          className="h-96 w-96 rounded-full border-4 border-white object-cover shadow-2xl"
        />
      </div>

      
    </div>

    
  )
}

export default Hero
