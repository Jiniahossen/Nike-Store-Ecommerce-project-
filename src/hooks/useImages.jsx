import axios from "axios";

export const imageUpload = async(image) => {
    const formData = new FormData();
    formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=56b32cc14fae76f1ffc526f48169c7d2`;
        const { data } = await axios.post(url, formData);
        return data;
   
}