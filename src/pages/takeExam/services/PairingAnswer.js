
import axios from "axios"
import {_getToken} from './index.'

const createPairAnswerAPI = async  (QuestionId, selectedOptions) => { 

    try {
        const structuredMatches = selectedOptions.map((item)=>{
            return({
                question_pair_id: item.id,
                selected_match: item.match
            })
        })
        const token = _getToken()
        const response = await axios({
            method: 'post',
            url: '/api/exams/answers/create',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    question_id: QuestionId,
                    selected_pairs: structuredMatches,
                    },
                id: new Date().getTime(), // unique id for the request
                },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data.result){
            return response.data.result
        }else {
            return {
                'status': 'error',
                'message' : 'Error on the server response'
            }
        }
        
    } catch (e) {
        return {
            'status': 'error',
            'message' : e.message
        }
    }
} 

const updatePairAnswerAPI = async  (answerId, optionId) => { 

    try {      
        const token = _getToken()
        const response = await axios({
            method: 'put',
            url: '/api/exams/answers/update',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    answer_id: answerId,
                    selected_options: [optionId],
                    },
                id: new Date().getTime(), // unique id for the request
                },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data.result){
            return response.data.result
        }else {
            return {
                'status': 'error',
                'message' : 'Error on the server response'
            }
        }
        
    } catch (e) {
        return {
            'status': 'error',
            'message' : e.message
        }
    }
} 

export {createPairAnswerAPI, updatePairAnswerAPI}