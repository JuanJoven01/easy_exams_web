import axios from "axios";


const newAttemptAPI = async  (accessCode, name, id) => { 

    try {      
        const response = await axios({
            method: 'post',
            url: '/api/exams/attempts/create',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    access_code: accessCode,
                    student_name: name, 
                    student_id: id,
                    },
                id: new Date().getTime(), // unique id for the request
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

export default newAttemptAPI