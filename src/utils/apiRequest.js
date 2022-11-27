import axios from 'axios'
const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        const response = await axios.get(url, optionsObj);
        if (!response.ok) throw Error('please reload the app');
    } catch(err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
}

export default apiRequest
