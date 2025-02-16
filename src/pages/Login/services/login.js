import axios from "axios";


const loginAPI = async  (email, code) => { 

    try {        
        const response = await axios({
            method: 'post',
            url: '/api/easy_apps/users/validate_code',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    email: email,
                    code: code
                    },
                id: new Date().getTime(), // unique id for the request
                }
        })
        return response.data.result
    } catch (e) {
        return {
            'error': 'Error on request',
            'message' : e.message
        }
    }
}

export default loginAPI