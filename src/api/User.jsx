import instance from '../utils/Request'



export const login = (username,password) => {
    return instance(
        {
            method:'POST',
            url:'/login',
            data:{
                username,
                password
            }
        }
    )
}


export const getUserProfile = () => {
    return instance(
        {
            method:'GET',
            url:'/user'
        }
    )
}