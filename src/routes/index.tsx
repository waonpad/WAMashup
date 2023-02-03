import React from "react";
import { Routes, Route } from "react-router-dom";
import Example from "@/features/Example/routes/Example";
import Top from "@/features/Top/routes/Top";
import Page404 from "@/features/Page404/routes/Page404";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Top />} />
            <Route path='/works' element={<Top />} />
            <Route path='/example' element={<Example />} />
            <Route path='*' element={<Page404 />} />
        </Routes>
    );
};