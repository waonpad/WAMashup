import React, { useState, useEffect } from 'react';
import { ContentLayout } from '@/components/Layout';
import { WikiMap } from '@/components/WikiMap';

export const Top = () => {

    return(
        <ContentLayout title='WikiMap'>
            <WikiMap
                sx={{
                    width: '100%',
                    height: 'calc(100vh - 64px)'
                }}
                defaultCenter={{lat: 35.17109038306571, lng: 136.88149398241316}}
            />
        </ContentLayout>
    )
};