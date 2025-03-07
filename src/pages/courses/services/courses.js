import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;

const getCoursesAPI = async (token) => {
    try {      
        const response = await axios({
            url: `${apiUrl}/exams/courses/get`,
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

const createCourseAPI = async  (name, description, token) => { 

    try {      
        const response = await axios({
            method: 'post',
            url: `${apiUrl}/exams/courses/create`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    name: name,
                    description: description
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

const updateCourseAPI = async  (name, description,courseId, token) => { 
    try {      
        const response = await axios({
            method: 'put',
            url: `${apiUrl}/exams/courses/update/`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    name: name,
                    description: description,
                    course_id : courseId
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

const removesCourseAPI = async  (id, token) => { 
    try {      
        const response = await axios({
            method: 'delete',
            url: `${apiUrl}/exams/courses/delete/${id}`,
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

const addUserToCourseAPI = async  (code, accessKey, token) => { 
    try {      
        const response = await axios({
            method: 'put',
            url: `${apiUrl}/exams/courses/update/add_user`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    code: code,
                    access_key: accessKey,
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

export {getCoursesAPI, createCourseAPI, updateCourseAPI, removesCourseAPI, addUserToCourseAPI}