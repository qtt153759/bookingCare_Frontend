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
const getAllDoctors = () => {
    return axios.get("/api/get-all-doctors");
};
const saveDetailDoctorService = (data) => {
    return axios.post("/api/save-infor-doctors", data); //truyen data theo syntax nhu v
};
const getDetailInforDoctor = (inputData) => {
    //Nhầm get thành post ở đoạn này sẽ ko hiện lỗi ở cả front&&backend đâu, chỉ ko xuất ra input thôi, nên phải cẩn thận
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputData}`); //truyen data theo syntax nhu v
};
const saveBulkScheduleDoctor = (data) => {
    return axios.post("/api/bulk-create-schedule", data);
};
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
};
