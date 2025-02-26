import PropTypes from 'prop-types'


import useGlobalContext from '../../../../context/GlobalContext/useGlobalContext';
import useAttemptContext from '../../../../context/AttemptContext/useAttemptContext';
import { useEffect, useState } from 'react';

const Pairing = () => {


    const {setIsLoading, setModal} = useGlobalContext()
    const {questionsAData, showedQuestion} = useAttemptContext()

    const [matches, setMatches] = useState([])

    useEffect(() => {
        if (!questionsAData[showedQuestion]?.pairs) return;
    
        const newMatches = questionsAData[showedQuestion].pairs.map((pair) => ({
            ...pair,
            match: questionsAData[showedQuestion].matches?.[0] || null, 
        }));
    
        setMatches(newMatches);
    }, [questionsAData, showedQuestion]);
    
    const handleChange = (e, id) => {
        e.preventDefault()
        console.log('here')
        const newMatches = matches.map((item)=>{
            if (item.id != id){
                return item
            }
            return ({
                ...item,
                match: e.target.value
            })
        })
        setMatches(newMatches)
        console.log(newMatches)
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
        </div>
    )
}


export default Pairing