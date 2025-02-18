import { useState } from 'react';
import GlobalContext from './context';


export const GlobalProvider = ({ children }) => {
    const [modal, setModal] = useState ({
        'isOpen' : false,
        'isError' : false,
        'message' : `You shouldn't see this message`,
    })

    const [isLoading, setIsLoading] = useState(false)

    const [isLogged, setIsLogged] = useState(false)

    return (
        <GlobalContext.Provider value={{ 
                    modal, 
                    setModal,
                    isLoading,
                    setIsLoading,
                    isLogged,
                    setIsLogged
                }}>
            {children}
        </GlobalContext.Provider>
    );
    };