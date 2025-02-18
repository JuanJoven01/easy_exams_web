import axios from "axios";


const loginAPI = async  (email, password) => { 

    try {      
        const response = await axios({
            method: 'post',
            url: '/api/easy_apps/exams/auth',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    login: email,
                    password: password
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

export default loginAPI