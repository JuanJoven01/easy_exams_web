import axios from "axios"

import { _getToken } from "."
const apiUrl = import.meta.env.VITE_API_URL;
const createPairAPI = async  (term, match, questionId) => { 

    try {      
        const token = _getToken()
        const response = await axios({
            method: 'post',
            url: `${apiUrl}/exams/questions/pairs/create`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    term: term,
                    match: match,
                    question_id: questionId,
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


const updatePairAPI = async  (term, match, id) => { 
    try {      
        const token = _getToken()
        const response = await axios({
            method: 'put',
            url: `${apiUrl}/exams/question_pairs/update`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    term: term,
                    match: match,
                    pair_id: id,
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

const removesPairAPI = async  (id) => { 
    try {      
        const token = _getToken()
        const response = await axios({
            method: 'delete',
            url: `${apiUrl}/exams/questions/pairs/delete/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data){
            return response.data
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

export {createPairAPI, updatePairAPI, removesPairAPI}