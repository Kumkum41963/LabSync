import React, { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useTickets } from '@/context/TicketsContext'

const TicketWrapper = ({ children }) => {
    const { id } = useParams()
    const { getTicketById, tickets } = useTickets() // Destructure 'tickets' list
    
    // if we already have this ticket in our list
    const existingTicket = tickets?.find(t => t._id === id);

    // If we have it, don't show the loading screen (isLoading: false)
    const [ticket, setTicket] = useState(existingTicket || null);
    const [isLoading, setIsLoading] = useState(!existingTicket);

    useEffect(() => {
        let isMounted = true; // RACE CONDITION PREVENTER

        const fetchTicket = async () => {
            // Only trigger loading UI if we don't have the ticket already
            if (!existingTicket) setIsLoading(true);

            try {
                const res = await getTicketById(id);
                
                // Only update state if the user hasn't navigated away
                if (isMounted && res.success) {
                    setTicket(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch ticket:", error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchTicket();

        // Cleanup function: runs when the component unmounts
        return () => { isMounted = false; };
    }, [id, getTicketById, existingTicket]);

    if (isLoading && !ticket) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse text-primary text-xl">Loading ticket...</div>
            </div>
        )
    }

    if (!isLoading && !ticket) {
        return <Navigate to="/tickets" replace />;
    }

    return React.cloneElement(children, { ticket });
}

export default TicketWrapper;