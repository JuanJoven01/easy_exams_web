import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";


const Footer = () => {

    const linksToContact = [
        {
            'title':'GitHub',
            'link' : 'https://github.com/JuanJoven01',
            'image': <FaSquareGithub className="h-16 w-16 text-slate-400 mx-3"/>,
            'shadow': 'drop-shadow-[0px_0px_10px_rgba(100,100,100,0.7)]',
            'shadow_hover':  'hover:drop-shadow-[0px_0px_13px_rgba(100,100,100,0.9)]',
        },
        {
            'title':'LinkedIn',
            'link' : 'https://www.linkedin.com/in/juan-pablo-joven-urbano-05202129a/',
            'image': <FaLinkedin className="h-16 w-16 text-blue-500 mx-3"/>,
            'shadow': 'drop-shadow-[0px_0px_10px_rgba(0,50,235,0.7)]',
            'shadow_hover':  'hover:drop-shadow-[0px_0px_13px_rgba(0,10,235,0.9)]',
        },
        {
            'title':'Whatsapp',
            'link' : 'https://api.whatsapp.com/send/?phone=%2B573147249241',
            'image': <FaSquareWhatsapp className="h-16 w-16 mx-3 text-green-600"/>,
            'shadow': 'drop-shadow-[0px_0px_10px_rgba(0,130,100,0.6)]',
            'shadow_hover':  'hover:drop-shadow-[0px_0px_13px_rgba(0,130,100,0.8)]',
        }
    ]
    return (
        <footer className="border-t-2 border-slate-400 flex bg-slate-900 h-20 justify-center center">
            {
                linksToContact.map((item,index)=>(
                    <div key={index} className=" flex items-center ">
                        <a href={`${item.link}`} target="_blank" rel="noopener noreferrer" className={`${item.shadow} ${item.shadow_hover} opacity-70 hover:opacity-100 hover:animate-pulse`}>
                            {item.image}
                        </a>
                        
                    </div>
                ))
            }
        </footer>
    )
}

export default Footer