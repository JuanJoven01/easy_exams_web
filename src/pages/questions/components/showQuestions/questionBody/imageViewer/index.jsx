

import PropTypes from 'prop-types'

import { useState } from 'react'

import UploadImage from './uploadImage'
import CustomButton from '../../../../../../components/buttons'
import useGlobalContext from '../../../../../../context/GlobalContext/useGlobalContext'

const ImageViewer = ({questionData , setQuestionData}) => {

    const [isEditing, setIsEditing] = useState(false)

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
                                    <img src={`data:image/png;base64,${questionData.image}`} alt="" className=' max-w-[300px] self-center '/>
                                </div>
                                
                            )
                            :
                            (   
                                <p> The Question Has Not Image Yet</p>
                            )
                        }
                        <div className=' text-center pt-5'>
                            <CustomButton 
                            text={`${questionData.image ? 'Update Image' : 'Upload Image'}`}
                            action={() =>setIsEditing(true)}
                            />
                        </div>
                        
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