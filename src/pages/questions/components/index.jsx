import PropTypes from 'prop-types';

import CustomButton from "../../../components/buttons/index.jsx"
import QuestionsCreatorComponent from './creator.jsx';
import { useState, useEffect } from 'react';
import useGlobalContext from '../../../context/GlobalContext/useGlobalContext.jsx';

import ShowQuestions from './showQuestions/index.jsx';

const QuestionsViewer = ({rawData, examId}) => {

    useEffect(()=> {
        setData(rawData)
    },[rawData])

    const [data, setData] = useState([])

    const {setIsZViewer} = useGlobalContext()

    const createQuestionHandler = () => {
        setIsZViewer({
            isActive: true,
            children: (
                <QuestionsCreatorComponent 
                setData={setData}
                examId = {examId}
                />
            )
        })
    }

    const [openModal, setOpenModal] = useState('')

    const openTheModal = (id) => {
        if (openModal == id){
            setOpenModal('')
        } else{
            setOpenModal(id)
        }
    }

    return (
        <section className="text-slate-300 mt-0 flex-col font-satoshi-blackitalic w-full">
            <div className="flex justify-center w-full">
                <CustomButton
                    text={'Create A New Question'}
                    action={createQuestionHandler}
                />

            </div>
            <div className="bg-radial-gradient from-gradient_alpha via-gradient_bravo to-transparent to-70% backdrop-blur-sm mt-5">
                <h2 className="text-center p-5 text-4xl text-delta font-semibold bg-gradient-to-r from-blue-500 to-delta bg-clip-text">
                    Your Exam Questions:
                </h2>
                {data.length === 0 ? (
                    <h2 className="text-center py-5 px-10 text-3xl font-thin text-slate-400 font-satoshi-lightitalic">
                        {"You haven't questions in this exam yet, please create a new exam."}
                    </h2>
                ) : (
                    data.map((item,index) => {
                        if (item){
                            return(
                                <ShowQuestions
                                index={index}
                                question={item}
                                key={item.id}
                                openTheModal={openTheModal}
                                openModal = {openModal} 
                                setData={setData}/>
                            )
                        }
                        
                        
                    })
                )
            }
            </div>
            <div className="flex justify-center my-10 w-full">
                <CustomButton
                    text={'Create A New Question'}
                    action={createQuestionHandler}
                />

            </div>
        </section>
        
    )
}

QuestionsViewer.propTypes = {
    rawData: PropTypes.array.isRequired,
    examId : PropTypes.number.isRequired
};

export default QuestionsViewer