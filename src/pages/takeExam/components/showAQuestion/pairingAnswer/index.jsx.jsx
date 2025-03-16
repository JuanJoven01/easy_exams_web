

import useGlobalContext from '../../../../../context/GlobalContext/useGlobalContext';
import useAttemptContext from '../../../../../context/AttemptContext/useAttemptContext';
import CustomPNButton from '../../../../../components/buttons/customPNButton';
import CustomFinishButton from '../../../../../components/buttons/customFinishButton';
import AttemptImageViewer from '../../imageViewer';
import { useEffect, useState } from 'react';

import { createPairAnswerAPI, updatePairAnswerAPI } from '../../../services/PairingAnswer';

const Pairing = () => {


    const {setIsLoading, setModal} = useGlobalContext()
    const {questionsAData, showedQuestion, setShowedQuestion, setAnswersData, answersData} = useAttemptContext()

    const [changeWitness, setChangeWitness] = useState(false)

    const [matches, setMatches] = useState([])

    const [answerId, setAnswerId] = useState(false)

    useEffect(() => {
        if (!questionsAData[showedQuestion]?.pairs) return;
        let newMatches = questionsAData[showedQuestion].pairs.map((pair) => ({
            ...pair,
            match: questionsAData[showedQuestion].matches?.[0] || null,
        }));
        if (answersData.length !== 0) {
            const index = answersData.findIndex(
                (item) => item.question_id === questionsAData[showedQuestion].id
            );
            if (index !== -1) {
                const answerData = answersData[index];
                newMatches = newMatches.map((item) => {
                    const selectedMatch = answerData.pair_selected.find(
                        (pair) => pair.question_pair_id === item.id
                    );
                    return selectedMatch
                        ? { ...item, match: selectedMatch.selected_match }
                        : item;
                });
                setAnswerId(answerData.id);
            }
        }
        setMatches(newMatches);
    }, [questionsAData, showedQuestion, answersData]);
    
    
    const handleChange = (e, id) => {
        e.preventDefault()
        if (!changeWitness){
            setChangeWitness(true)
        }
        const newMatches = matches.map((item)=>{
            if (id == item.id ){
            return ({
                ...item,
                match: e.target.value
            })} else{
                return item
            }
            
        })
        setMatches(newMatches)
    }

    const createPairAnswer =async ()=>{
        if(!changeWitness){return}
        setIsLoading(true)
        const response = await createPairAnswerAPI(questionsAData[showedQuestion].id, matches)
        if (response.status == 'error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
            return
        }
        setAnswersData((prev)=>{
            const newData = prev.map((item)=>item)
            newData.push({
                ...response.data,
                pair_selected: response.data.selected_pairs
            })
            return(newData)
        })
        setIsLoading(false)
    }

    const updatePairAnswer =async ()=>{
        if(!changeWitness){return}
        setIsLoading(true)
        const response = await updatePairAnswerAPI(answerId, matches)
        if (response.status == 'error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
            return
        }
        const newMatches = matches.map((item)=>({
            ...item,
            selected_match : item.match,
            question_pair_id : item.id
        }))
        setAnswersData((prev)=>{
            const newData = prev.map((item)=>{
                if (item.id == answerId){
                    return ({
                        ...item,
                        pair_selected: newMatches
                    })
                }
                return item
            })
            return(newData)
        })
        setIsLoading(false)
    }


    return(

        <div className='w-full'>
            <p className='text-slate-300 font-bold'>{`${showedQuestion +1}) ${questionsAData[showedQuestion].content}`}</p>
            <form>
                <p className='py-2 px-5 '>This is a matching question, select the match for any pair:</p>
                {
                    matches.map((pair)=>{
                        return(
                            <div key={pair.id}>
                                <label>{`${pair.term}: `}</label>
                                <select id="matches" 
                                    name="matches" 
                                    onChange={(e)=>handleChange(e, pair.id)}
                                    className='border-2 rounded-md mb-2 hover:cursor-pointer'
                                    defaultValue={pair.match}
                                >
                                    {questionsAData[showedQuestion].matches.map((match, index)=>{
                                        return (
                                            <option key={index} value={match}>
                                                {match}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                        )
                        
                    })
                    
                }
            </form>
            {questionsAData[showedQuestion].image &&
                <AttemptImageViewer 
                    image={questionsAData[showedQuestion].image}
            />}
            <div className='flex justify-end items-center w-full'>
                {
                    showedQuestion != 0 &&
                        <div className=''>
                            <CustomPNButton
                                text={'Previous'}
                                action={()=>{
                                    setShowedQuestion((prev)=>prev -1)
                                    if (answerId){
                                        updatePairAnswer()
                                    } else {
                                        createPairAnswer()
                                    }
                                }}
                            />
                        </div>
                }
                {
                    showedQuestion < (questionsAData.length -1) &&
                    <div className='ml-2'>
                        <CustomPNButton
                            text={'Next'}
                            action={()=>{
                                setShowedQuestion((prev)=>prev + 1)
                                if (answerId){
                                    updatePairAnswer()
                                } else {
                                    createPairAnswer()
                                }
                            }}
                        />
                    </div>
                }
                {
                (showedQuestion == (questionsAData.length -1)) &&
                <div className='ml-2'>
                    <CustomFinishButton
                        action={()=>{
                            if (answerId){
                                updatePairAnswer()
                            } else {
                                createPairAnswer()
                            }
                            setShowedQuestion(0)
                            setAnswersData([])
                        }}
                    />
                </div>
            }
            </div>
        </div>
    )
}


export default Pairing