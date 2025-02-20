import { useNavigate } from 'react-router';

import useGlobalContext from "../../context/GlobalContext/useGlobalContext"
import { useEffect } from 'react';

const Navbar = () => {

    const {isLogged, setIsLogged} = useGlobalContext()

    const navigate = useNavigate()

    useEffect(()=>{
        const loginInfo = JSON.parse(localStorage.getItem('easyAppsLogin')) 
        if (loginInfo){
            setIsLogged(true)
        }
    },[isLogged, setIsLogged])

    

    const removesLogin = () => {
        localStorage.removeItem('easyAppsLogin')
        setIsLogged(false)
        navigate('/')
    }

    return(
        <nav className=" border-b-2 border-slate-400 flex h-16 justify-between bg-opacity-20 backdrop-blur-md fixed w-full text-slate-200 font-lora z-10"> 
            <a className={`my-auto ml-5 px-5 hover:cursor-pointer hover:text-echo hover:underline`} href="/">
                EASY EXAMS
            </a>

            {!isLogged &&
                <ul className="my-auto mr-5 flex">
                    <a className={`px-5 hover:cursor-pointer hover:text-echo hover:underline`} href="login">
                        Login As Professor
                    </a>
                
                    <a className={`px-5 hover:cursor-pointer hover:text-echo hover:underline`} href="" >
                        Go To Easy Apps
                    </a>
                </ul>
            }

            {isLogged &&
                <ul className="my-auto mr-5 flex">
                    <p className={`px-5 hover:cursor-pointer hover:text-echo hover:underline`} onClick={removesLogin} href="login">
                        Logout
                    </p>

                    <a className={`px-5 hover:cursor-pointer hover:text-echo hover:underline`} href="/courses">
                        Go To Courses
                    </a>
                
                    <a className={`px-5 hover:cursor-pointer hover:text-echo hover:underline`} href="" >
                        Go To Easy Apps
                    </a>
                </ul>
            }
        </nav>
    )
    
}

export default Navbar