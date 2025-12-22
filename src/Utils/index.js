import axios from "axios";

export const imageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  console.log("IMGBB API KEY =>", apiKey);

  if (!apiKey) {
    throw new Error("IMGBB API key missing");
  }

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData
  );

  return data.data.display_url;
};


//save or update a user in db 6 way
export const saveOrUpdateUser = async userData=>{
  const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/user`,userData)
  return data
}