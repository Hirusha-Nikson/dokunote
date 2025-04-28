"use client";

import { Loader } from "lucide-react";

interface LoadingSpinnerProps {
    label: string;
}

const LoadingSpinner = ({label} : LoadingSpinnerProps ) => { 
    return (
        <>
        <div className="flex flex-col min-h-screen justify-center items-center mx-auto text-center">
            <Loader className="animate-spin w-6 h-6 opacity-70 my-2" />
            <span className="text-sm opacity-70">{label}</span>
            <span className="text-xs opacity-60">please wait</span>
        </div>
        </>
    );
}

export default LoadingSpinner;