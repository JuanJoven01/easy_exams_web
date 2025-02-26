import { useContext } from 'react';
import AttemptContext from './context';

const useAttemptContext = () => {
    const context = useContext(AttemptContext);
        if (!context) {
            throw new Error('useGlobalContext should be used into global provider');
        }
    return context;
};

export default useAttemptContext;