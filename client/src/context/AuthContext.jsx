import axios from '../helper/axios';
import { createContext, useEffect, useReducer } from 'react'

const AuthContext = createContext()

const AuthReducer = (state,action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('user',JSON.stringify(action.payload))
            return { user : action.payload};
        case 'LOGOUT':
            localStorage.removeItem('user')
            return {user : null}
        default:
            return state;
    }
}

const AuthContextProvider = ({children}) => {
    let [state,dispatch] = useReducer(AuthReducer,{
        user : null,
    })

    useEffect(()=>{
        try {
            axios.get('/user/me').then(res =>{
                let user = res.data
                if(user){
                    dispatch({type:'LOGIN',payload:user})
                }else{
                    dispatch({type:'LOGOUT'})
                }
            })
        } catch (error) {
            console.log(error)
            dispatch({type:'LOGOUT'})
        }
    },[])
    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthContextProvider}