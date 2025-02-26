
import useGlobalContext from '../../context/GlobalContext/useGlobalContext'

const ZViewer = () => {

    const {isZViewer} = useGlobalContext()
    return(
        <div className="fixed inset-0 flex items-center justify-center z-50"
            
            >
        {/* Overlay */}
            <div
                className="absolute inset-0 bg-black opacity-50"
            ></div>

            {/* Loading */}
            <div className='z-50 max-w-[70vw] max-h-[70vh]'>
                {isZViewer.children}
            </div>
        </div>
    )
}


export default ZViewer