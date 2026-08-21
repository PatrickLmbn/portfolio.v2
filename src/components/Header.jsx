import { ExternalLink } from "lucide-react"
const Header = () => {
     const links = {
        "About Me": "/",
        "Projects": "#projects",
        "Tech": "#tech",
        "Certificates": "#certificates"   
    }
  return (
    <div className="w-full mt-10 flex items-center justify-between gap-4 p-4 text-dark">
        <div className="flex items-center gap-2 rounded-2xl border px-6 py-1 ">
            PatrickLmbn
        </div>
        <nav className="flex space-x-10">
            {(Object.entries(links)).map(([name, path]) => (
            <a key={path} href={path} className="text-md ">
                {name}
            </a>
            ))}
        </nav>
        <button className="flex items-center gap-2 bg-[#2C2C2C] text-white rounded-2xl border px-6 py-1 hover:cursor-pointer hover:bg-white hover:text-black transition duration-300">
            Let's Talk
            <ExternalLink className="w-4 h-4" />

        </button>
    </div>
  )
}

export default Header
