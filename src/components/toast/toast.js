"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastWrapper() {
    return (
        <ToastContainer theme="dark" position="bottom-right"/>
    );
}

export function ToastInfo({content}) {
    'use client'
    return toast.info(content)
}