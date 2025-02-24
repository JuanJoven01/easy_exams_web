

import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import CustomButton from '../../../../../../components/buttons'
import useGlobalContext from '../../../../../../context/GlobalContext/useGlobalContext'

import { updateQuestionImageAPI } from '../../../../services'


const UploadImage = ({questionData, setQuestionData, setIsEditing}) =>{

    const {setModal, setIsLoading} = useGlobalContext()

    const [draggedData, setDraggedData] = useState() 
    const [base64, setBase64] = useState() 

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => {
                setModal({
                    'isOpen' : true,
                    'isError' : true,
                    'message' : `Your Upload Was Aborted`,
                })
            }
            reader.onerror = () => {
                setModal({
                    'isOpen' : true,
                    'isError' : true,
                    'message' : `Error While Upload`,
                })
                
            }
            reader.onload = () => {
                // Do whatever you want with the file contents
                // const binaryStr = reader.result
                const image = reader.result
                const base64String = reader.result.split(',')[1];
                setDraggedData(image)
                setBase64(base64String)
            }
            reader.readAsDataURL(file)
        })
    },[setModal])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, 
        maxFiles: 1, 
        maxSize : 1000000,
        accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg"],
            },

        onDropRejected: (event)=>{ 
            setModal({
            'isOpen' : true,
            'isError' : true,
            'message' : event[0].errors[0].message,
            })
        },
    }, [setModal ])


    const updateImage = async () => {
        setIsLoading(true)
        const response = await updateQuestionImageAPI(questionData.id, base64)
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
            image: base64
        }))
        setIsLoading(false)
        setIsEditing(false)
        
    }

    return(
        <div className='flex flex-col self-center  w-[70%] text-center pb-4 min-h-20'>
                <div className='hover:cursor-pointer w-full border-1 border-dotted flex items-center min-h-20'  {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <p className='w-full'>Drop the files here ...</p> :
                        <div className='w-full'>
                            <p className='w-full'>{"Drag 'n' drop some files here, or click to select files"}</p>
                            <p>Please note that you can only upload one image with a maximum weight of 1 MB.</p>
                        </div>
                        
                    }
                </div>
                {
                    draggedData &&
                        <div className='mt-5 flex self-center flex-col'>
                            <img src={`${draggedData}`} alt="Dragged Image" className='w-[300px] self-center ' />
                            <div className=' flex mt-5 self-center'>
                                <CustomButton
                                    text={'Upload Image'}
                                    action={()=> updateImage()}
                                />
                                
                            </div>                
                        </div>
                }               
                <div className='my-5 flex self-center'>
                    <CustomButton
                        text={'Cancel'}
                        action={()=>setIsEditing(false)}
                    />
                </div>
                
            </div>
    )
}

UploadImage.propTypes = {
    setIsEditing: PropTypes.object.setIsEditing,
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired

}

export default UploadImage