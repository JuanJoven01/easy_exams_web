import axios from "axios"


const _getToken = () => {
    const localStorageLogin = localStorage.getItem('easyAppsLogin');
    if (localStorageLogin) {
        const jsonLogin = JSON.parse(localStorageLogin);
        const token = jsonLogin.token;
        return token
    }
}
const getExamsAPI = async (id, token) => {
    try {      
        const response = await axios({
            url: `/api/exams/get/${id}`,
            method: 'get',
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

const createExamAPI = async  (name, description, duration, courseId, token) => { 

    try {      
        const response = await axios({
            method: 'post',
            url: '/api/exams/create',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    name: name,
                    description: description,
                    duration: duration,
                    course_id: courseId
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

const updateExamAPI = async  (examId, name, description, duration, isActive,  token) => { 
    try {      
        const response = await axios({
            method: 'put',
            url: '/api/exams/update/',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    name: name,
                    description: description,
                    duration: duration, 
                    exam_id : examId,
                    is_active: isActive
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

const refreshAccessCodeAPI = async  (examId) => { 
    try {    

        const token = _getToken()
        const response = await axios({
            method: 'put',
            url: '/api/exams/update_code',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    exam_id : examId,
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

const refreshExamStatusAPI = async  (examId) => { 
    try {    

        const token = _getToken()
        const response = await axios({
            method: 'put',
            url: '/api/exams/update_status',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    exam_id : examId,
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

const removesExamAPI = async  (id) => { 
    try {      
        const token = _getToken()
        const response = await axios({
            method: 'delete',
            url: `/api/exams/delete/${id}`,
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


export {getExamsAPI,createExamAPI, updateExamAPI, refreshAccessCodeAPI, refreshExamStatusAPI, removesExamAPI}