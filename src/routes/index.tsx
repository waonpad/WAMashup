import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazyImport } from '@/utils/lazyImport';

const { Top } = lazyImport(() => import('@/features/Top'), 'Top');
const { Example } = lazyImport(() => import('@/features/Example'), 'Example');
const { Page404 } = lazyImport(() => import('@/features/Page404'), 'Page404');

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