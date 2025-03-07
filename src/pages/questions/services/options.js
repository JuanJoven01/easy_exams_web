import axios from "axios"

import { _getToken } from "."
const apiUrl = import.meta.env.VITE_API_URL;
const createOptionAPI = async  (content, isCorrect, questionId) => { 

    try {      
        const token = _getToken()
        const response = await axios({
            method: 'post',
            url: `${apiUrl}/exams/questions/options/create`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    content: content,
                    is_correct: isCorrect,
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


const updateOptionAPI = async  (content, isCorrect, id) => { 

    try {      
        const token = _getToken()
        const response = await axios({
            method: 'put',
            url: `${apiUrl}/exams/question_options/update`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    content: content,
                    is_correct: isCorrect,
                    option_id: id,
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

const removesOptionAPI = async  (id) => { 
    try {      
        const token = _getToken()
        const response = await axios({
            method: 'delete',
            url: `${apiUrl}/exams/questions/options/delete/${id}`,
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

export {createOptionAPI, updateOptionAPI, removesOptionAPI}