import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackBtn = () => {
    const navigate = useNavigate();

    const onBack = () => navigate('/tickets');

    return (
        <button
            onClick={onBack}
            className="p-2 hover:bg-accent/20 rounded-lg transition text-muted-foreground hover:text-foreground"
        >
            <ArrowLeft className="w-5 h-5" />
        </button>
    )
}

export default BackBtn