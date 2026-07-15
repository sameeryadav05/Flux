import Redis from '../../../../shared/redis/redis.js'
import axios from '../config/Axios.js'

export async function getMessages(conversationId)
{
        const {data} = await axios.get(`/getMessage/${conversationId}`)
        return data;
}

export const getRecentMessages = async (conversationId)=>{
    try {
        const key = `messages-${conversationId}`;
        const cached = await Redis.get(key);

        if (cached) {
            return JSON.parse(cached);
        }

        let messages = await getMessages(conversationId);
        let recentMessages  = messages.slice(-20)
        await Redis.set(
            key,
            JSON.stringify(recentMessages),
            "EX",
            60 * 60 * 24
        );

        return recentMessages;

    } catch (err) {
        console.error(err);
        const messages = await getMessages(conversationId);
         return messages.slice(-20);
    }
}

export const addMessage = async (conversationId,role,content)=>{
    try {
        const key = `messages-${conversationId}`;

        const cached = await Redis.get(key);

        let messages = cached
            ? JSON.parse(cached)
            : [];

        messages.push({ role, content });

        messages = messages.slice(-20);

        await Redis.set(
            key,
            JSON.stringify(messages),
            "EX",
            60 * 60 * 24
        );

    } catch (err) {
        console.error(err);
        return;
    }
}