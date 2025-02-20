import axios from "axios"

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

const updateExamAPI = async  (name, description,courseId, token) => { 
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

// const removesCourseAPI = async  (id, token) => { 
//     try {      
//         const response = await axios({
//             method: 'delete',
//             url: `/api/exams/courses/delete/${id}`,
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         if (response.data){
//             return response.data
//         }else {
//             return {
//                 'status': 'error',
//                 'message' : 'Error on the server response'
//             }
//         }
        
//     } catch (e) {
//         return {
//             'status': 'error',
//             'message' : e.message
//         }
//     }
// } 

// const addUserToCourseAPI = async  (code, accessKey, token) => { 
//     try {      
//         const response = await axios({
//             method: 'put',
//             url: '/api/exams/courses/update/add_user',
//             data: {
//                 jsonrpc: '2.0',
//                 method: 'call',
//                 params: {
//                     code: code,
//                     access_key: accessKey,
//                     },
//                 id: new Date().getTime(), // unique id for the request
//                 },
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//         })
//         if (response.data.result){
//             return response.data.result
//         }else {
//             return {
//                 'status': 'error',
//                 'message' : 'Error on the server response'
//             }
//         }
        
//     } catch (e) {
//         return {
//             'status': 'error',
//             'message' : e.message
//         }
//     }
// } 

export {getExamsAPI,createExamAPI, updateExamAPI}