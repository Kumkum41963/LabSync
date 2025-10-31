import { useEffect, useState } from "react";
import useAxios from "./useAxios";

export const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxios();

  const fetchTickets = async () => {
    try {
      const res = await axiosInstance.get("/tickets");
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("Error fetching tickets:", err.message);
      setError(err.response?.data?.message || "Failed to load tickets");
    } finally {
      setIsLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return { tickets, isLoadingTickets, error, refetchTickets: fetchTickets };
};
