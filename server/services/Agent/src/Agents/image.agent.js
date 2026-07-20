
import axios from 'axios'
import {getURLFromS3, uploadTOS3} from '../utils/upload_S3.js'
const imageAgent = async (state) => {
    try {
            
            const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(state.prompt)}`

            // console.log(imageUrl,'\n');

            const imageRes = await axios.get(imageUrl,{responseType:"arraybuffer"});
            const buffer = Buffer.from(imageRes.data)
            const filename = `img-${Date.now()}.png`
            await uploadTOS3(filename,buffer,'image/png')
            const downloadURL = await getURLFromS3(filename,24*60*60); // for 1 day


            const aiResponse = `
    # ✨ Image Generated Successfully!

    ![Generated Image](${downloadURL})

    **[Download Image](${downloadURL})**

    > 🛡️ This secure download link expires in **24 hours**.
`
.replace(/^[ \t]+/gm, "")
.trim();
            return {
                ...state,
                aiResponse
            }
            // console.log("image Res: ", imageRes);
    }
catch (error) {
    if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);

        if (error.response?.data) {
            console.log(
                Buffer.from(error.response.data).toString("utf8")
            );
        }
    } else {
        console.log(error);
    }

    return {
        ...state,
        aiResponse: "❌ Failed To Generate Image"
    };
}
}

export default imageAgent