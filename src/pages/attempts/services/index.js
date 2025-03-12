import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL;


const _getToken = () => {
    const localStorageLogin = localStorage.getItem('easyAppsLogin');
    if (localStorageLogin) {
        const jsonLogin = JSON.parse(localStorageLogin);
        const token = jsonLogin.token;
        return token
    }
}
const getAttemptsAPI = async (id, startDate, endDate) => {
    const token = _getToken()
    try {      
        const response = await axios({
            url: `${apiUrl}/exams/attempts/get_full/${id}?start_date=${startDate}&end_date=${endDate}`,
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

const getQuestionsAPI = async (id) => {
    const token = _getToken()
    try {      
        const response = await axios({
            url: `${apiUrl}/exams/questions/${id}`,
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


export {getAttemptsAPI, getQuestionsAPI}