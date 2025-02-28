import PropTypes from 'prop-types'


import useGlobalContext from '../../../../context/GlobalContext/useGlobalContext';
import useAttemptContext from '../../../../context/AttemptContext/useAttemptContext';
import CustomPNButton from '../../../../components/buttons/customPNButton';
import { useEffect, useState } from 'react';

import { createPairAnswerAPI, updatePairAnswerAPI } from '../../services/PairingAnswer';

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
        console.log('answersData.length')
        console.log(answersData.length)
        if (answersData.length !== 0) {
            const index = answersData.findIndex(
                (item) => item.question_id === questionsAData[showedQuestion].id
            );
            console.log('index')
            console.log(index)
            if (index !== -1) {
                const answerData = answersData[index];
                console.log('answerData')
                console.log(answerData)
                console.log('newMatches')
                console.log(newMatches)
                newMatches = newMatches.map((item) => {
                    const selectedMatch = answerData.pair_selected.find(
                        (pair) => pair.question_pair_id === item.id
                    );
                    console.log('selectedMatch')
                    console.log(selectedMatch)
                    return selectedMatch
                        ? { ...item, match: selectedMatch.selected_match }
                        : item;
                });
                setAnswerId(answerData.id);
            }
        }
        console.log('newMatches 2')
        console.log(newMatches)
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
        console.log('matches')
        console.log(matches)
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
        console.log('response.data')
        console.log(response.data)
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

    return(

        <div className='w-full'>
            <p className='text-slate-300 font-bold'>{questionsAData[showedQuestion].content}</p>
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
            <div className='flex justify-end items-center w-full'>
                {
                    showedQuestion != 0 &&
                        <div className=''>
                            <CustomPNButton
                                text={'Previous'}
                                action={()=>{
                                    setShowedQuestion((prev)=>prev -1)
                                    createPairAnswer()
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
                                createPairAnswer()
                            }}
                        />
                    </div>
                }
            </div>
        </div>
    )
}


export default Pairing