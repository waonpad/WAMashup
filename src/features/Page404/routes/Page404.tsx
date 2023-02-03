import React from 'react';
import { Link } from "react-router-dom";
import { ContentLayout } from '@/components/Layout';

export const  Page404 = () => {
    return (
        <ContentLayout>
            <h1>404 NOT FOUND</h1>
            <p>お探しのページが見つかりませんでした。</p>
            <Link to="/">Topに戻る</Link>
        </ContentLayout>
    );
}