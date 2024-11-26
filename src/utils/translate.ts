import axios from "axios";

export async function translate(text: string): Promise<string> {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    const response = await axios.get(url);
    return response.data[0][0][0];
}