import axios from "axios";

// A hook that returns an axios instance with token support

const useAxios = () => {
    const token = localStorage.getItem("token") // get token from client 

    const instance = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : ""
        },
    })
    console.log("log from useAxios:",import.meta.env.VITE_API_URL)

    return instance;
}

export default useAxios