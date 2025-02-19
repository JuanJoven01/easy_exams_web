import axios from "axios"

const getCoursesAPI = async (token) => {
    try {      
        const response = await axios({
            url: '/api/exams/courses/get',
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
            url: '/api/exams/courses/create',
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
            url: '/api/exams/courses/update/',
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


export {getCoursesAPI, createCourseAPI, updateCourseAPI}