import axios from "../axios";
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("/api/login", {
        email: userEmail,
        password: userPassword,
    }); //co the viet tat return axios.post('/api/login',{email,password}) neu truyen cung 2 tham so (email,password);
    //ham nay return status trong userController cua backend, tuy nhien axios cai dat tra ve dung data.err
};
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data); //truyen data theo syntax nhu v
};
const deleteUserService = (userId) => {
    return axios.delete("/api/delete-user", {
        data: {
            id: userId,
        },
    }); //truyen data theo syntax nhu v
};
const editUserService = (inputData) => {
    return axios.put("/api/edit-user", inputData); //you cannot do like delete,
    //dont use: data:inputData, because in server it will look like that data{{id,email,firstName,LastName}}
};
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
};
