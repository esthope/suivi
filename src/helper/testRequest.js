// import { axiosInstance } from "../providers/axiosProvider";



export const getSaltedBowls = () => {
    return axiosInstance.get('/menus/');
}