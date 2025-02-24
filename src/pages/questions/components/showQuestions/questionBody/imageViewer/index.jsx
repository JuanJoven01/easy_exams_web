

import PropTypes from 'prop-types'

import { useState } from 'react'

import UploadImage from './uploadImage'

import { updateQuestionImageAPI } from '../../../../services'
import CustomButton from '../../../../../../components/buttons'
import useGlobalContext from '../../../../../../context/GlobalContext/useGlobalContext'

const ImageViewer = ({questionData , setQuestionData}) => {

    const [isEditing, setIsEditing] = useState(false)

    const {setIsLoading, setModal, setIsZViewer} = useGlobalContext()

    const removeImage = async () => {
        setIsLoading(true)
        const response = await updateQuestionImageAPI(questionData.id, false)
        if (response.status == 'error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
            return
        }
        setQuestionData((prevData)=>({
            ...prevData,
            image: false
        }))

        setIsLoading(false)
    } 

    return(
        <div className='flex w-full flex-col'>

            {
                isEditing ?
                (
                    <UploadImage
                        questionData={questionData}
                        setQuestionData={setQuestionData}
                        setIsEditing={setIsEditing}
                    />

                )
                :
                (
                    <div className=' self-center pb-4'>
                        {   questionData.image ?
                            (
                                <div>
                                    <p className=' text-center py-5'>Image:</p>
                                    <img src={`data:image/png;base64,${questionData.image}`} alt="" className=' hover:cursor-pointer max-w-[300px] self-center ' data-tooltip-id="questions" data-tooltip-content="Show Full Size"
                                        onClick={()=>{
                                            setIsZViewer({
                                                isActive: true,
                                                children: (
                                                    <img src={`data:image/png;base64,${questionData.image}`} alt="" className=' hover:cursor-pointer self-center '  data-tooltip-id="questions" data-tooltip-content="Click to Close"
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
                                
                            )
                            :
                            (   
                                <p> The Question Has Not Image Yet</p>
                            )
                        }
                        <div className=' text-center pt-5'>
                            <button
                                type="button"
                                onClick={(event)=>{
                                    event.stopPropagation()
                                    setIsEditing(true)
                                }}
                                className="  m-2 px-3 hover:cursor-pointer  bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md "
                                >
                                    {`${questionData.image ? 'Update Image' : 'Upload Image'}`}
                            </button>
                        </div>
                        {
                            questionData.image &&
                            <div className=' text-center'>
                            <button
                                type="button"
                                onClick={(event)=>{
                                    event.stopPropagation()
                                    removeImage()
                                }}
                                className="  m-2 px-3 hover:cursor-pointer  bg-red-500 hover:bg-red-700 text-white rounded-md shadow-md "
                                >
                                    Delete Image
                            </button>
                        </div>
                        }
                        
                    </div>
                )
            
            }
            
        </div>
        
        
    )
}

ImageViewer.propTypes = {
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired

}

export default ImageViewer