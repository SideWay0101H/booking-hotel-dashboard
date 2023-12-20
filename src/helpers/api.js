import axios from "axios";

export default function requestApi(endpoint, method, body=[], responseType='json',contentType = 'application/json'){
    const headers = {
        "Accept": "application/json",
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*"
    }

    const instance = axios.create({ headers})

    instance.interceptors.request.use(
        (config) =>{
            const token = localStorage.getItem('access_token')
            if(token){
                config.headers['Authorization'] = `Bearer ${token}`
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        (response) =>{
            return response
        },
        async(error) =>{
            const originalConfig = error.config
            if(error.response && error.response.status === 419){
                try {
                    console.log("Call refresh token api")
                    const result = await instance.get(`${process.env.REACT_APP_API_URL}/v1/auth/refresh-token`,{
                        refresh_token:localStorage.getItem('refresh_token')
                    })
                    const {access_token,refresh_token} =result.data
                    localStorage.setItem('access_token',access_token)
                    localStorage.setItem('refresh_token',refresh_token)
                    originalConfig.headers['Authorization'] = `Bearer ${access_token}`

                    return instance(originalConfig)
                } catch (err) {
                    if(err.response && err.status === 400){
                        localStorage.removeItem('access_token')
                        localStorage.removeItem('refresh_token')
                        window.location.href = '/login'
                    }                    

                    return Promise.reject(err)
                }
            }
            return Promise.reject(error)
        }
    )

    return instance.request({
        method: method,
        url: `${process.env.REACT_APP_API_URL}/${endpoint}`,
        data: body,
        responseType: responseType
    })
}