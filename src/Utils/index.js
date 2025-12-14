//  import axios from "axios";

//  export const imageUpload = async ImageData =>{
//      const formData = new FormData()
//     formData.append('image', ImageData)

//     const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,formData)
//     console.log(data.data.display_url)
//     // const imageURL = data?.data.display_url
//    return data?.data.display_url


//  }

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
