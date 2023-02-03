import * as React from 'react';

import { Head } from '../Head';

type ContentLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export const ContentLayout = (props: ContentLayoutProps) => {
    const {children, title} = props;

    return (
        <>
            <Head title={title}>{children}</Head>
        </>
    )
};