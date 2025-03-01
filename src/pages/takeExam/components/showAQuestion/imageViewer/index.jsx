import PropTypes from 'prop-types'
import useGlobalContext from '../../../../../context/GlobalContext/useGlobalContext'

const AttemptImageViewer = ({image}) => {

    const {setIsZViewer} = useGlobalContext()

    return(
        <div className='flex w-full flex-col'>
            <div className=' self-center pb-4'>
                        <div>
                            <p className=' text-center py-5'>Image:</p>
                            <img src={`data:image/png;base64,${image}`} alt="" className=' hover:cursor-pointer max-w-[300px] self-center ' data-tooltip-id="questions" data-tooltip-content="Show Full Size"
                                onClick={()=>{
                                    setIsZViewer({
                                        isActive: true,
                                        children: (
                                            <img src={`data:image/png;base64,${image}`} alt="" className=' hover:cursor-pointer self-center'  data-tooltip-id="questions" data-tooltip-content="Click to Close"
                                                onClick={()=>setIsZViewer({
                                                    isActive: false,
                                                    children: null
                                                })}
                                                
                                            />
                                        )
                                    })
                                }}
                            />
                        </div>
                <div className=' text-center pt-5'>
                </div>
            </div>
        </div>
        
        
    )
}

AttemptImageViewer.propTypes = {
    image: PropTypes.string.isRequired

}

export default AttemptImageViewer