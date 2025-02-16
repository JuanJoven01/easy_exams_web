// import PropTypes from 'prop-types';
import useGlobalContext from '../../context/GlobalContext/useGlobalContext';

const Modal = () => {

    const {modal, setModal} = useGlobalContext()

    // Determine modal styles based on the type    
    const onClose = () => {
        setModal((prevState) =>({
            ...prevState,
            isOpen : false
        }))
    }

    const isError = modal['isError']
    const message = modal['message']

    const modalStyles =
        isError === false
        ? 'bg-blue-400'
        : 'bg-red-400';

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Overlay */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className={`relative p-0.5 rounded-lg shadow-lg ${modalStyles}`}
                onClick={onClose}
            >
                <button
                    className="absolute top-0 right-3 text-2xl text-white "
                    onClick={onClose}
                    >
                    &times;
                    </button>
                <div className=' bg-slate-900 rounded-lg py-2 px-10'>
                    <div className="text-center font-satoshi-bolditalic text-slate-200">
                        <h2 className="text-2xl font-bold mb-4">
                            {isError === false ? 'Success' : 'Error'}
                        </h2>
                        <p>{message}</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
    };


export default Modal;
