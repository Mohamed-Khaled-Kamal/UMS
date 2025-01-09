import  { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props:any) {
    let { userData }:any = useContext(AuthContext)
    if (localStorage.getItem("userToken") || userData) {
        return props.children ;
    } else {
        return <Navigate to={"/"} />
    }
}