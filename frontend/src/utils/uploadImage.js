import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosinstance";



const uploadImage = async (imageFile) => {
    const formdata = new FormData();
    // Append image file to form data
    formdata.append("image", imageFile)

try {
    const respone = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data', //Set headers for files upload
        },
    })

    return respone.data; //Return respone data

    } catch (error) {
        console.log("Error uploading the image", error)
        throw error; // Rethorow error for handling
    }
}

export default uploadImage