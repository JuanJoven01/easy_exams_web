import { useContext } from 'react';
import GlobalContext from './context';

const useGlobalContext = () => {
    const context = useContext(GlobalContext);
        if (!context) {
            throw new Error('useGlobalContext should be used into global provider');
        }
    return context;
};

export default useGlobalContext;