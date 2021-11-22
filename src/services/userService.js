import axios from "../axios"
const handleLoginApi=(userEmail,userPassword)=>{
    return axios.post('/api/login',{email:userEmail,password:userPassword})//co the viet tat return axios.post('/api/login',{email,password}) neu truyen cung 2 tham so (email,password);
    //ham nay return status trong userController cua backend, tuy nhien axios cai dat tra ve dung data.err
}
export {handleLoginApi}