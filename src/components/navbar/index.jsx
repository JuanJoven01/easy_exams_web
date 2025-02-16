
const Navbar = () => {


    return(
        <nav className=" border-b-2 border-slate-400 flex h-16 justify-between bg-opacity-20 backdrop-blur-md fixed w-full text-slate-200 font-lora z-10"> 
            <a className={`my-auto ml-5 px-5 hover:cursor-pointer hover:text-echo hover:underline`} href="/">
                EASY EXAMS
            </a>
            <ul className="my-auto mr-5 flex">
                
                <a className={`px-5 hover:cursor-pointer hover:text-echo hover:underline`} href="login">
                    Login As Professor
                </a>
                <a className={`px-5 hover:cursor-pointer hover:text-echo hover:underline`} href="" >
                    Go To Easy Apps
                </a>
            </ul>
        </nav>
    )
    
}

export default Navbar