import axios from "axios";

const base_url = 'http://localhost:5000/api'

//get all notification using axios
export async function getNotifications() {
    try {
        const response = await axios.get(base_url + '/notification/getNotifications');
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
}

//send notifcation using axios
export function sendNotification(notification) {
    const res = axios.post(`${base_url}/notification/notifications`, notification, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    return res;
}

//get user id
export async function getUser() {
    try {
        const response = await axios.get(`${base_url}/user/getAllUserId`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

//get all notifcation
export async function getAllNotification() {
    try {
        const response = await axios.get(`${base_url}/notification/getAllNotification`);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
}

//create user
export function createUser(user) {
    const res = axios.post(`${base_url}/user/createUser`, user, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    return res;
}