import React from 'react';
import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes/';
import View from './View';
import Header from '@/components/Header/Header';

function App() {
    return (
        <View>
            <AppProvider>
                <Header>
                    <AppRoutes />
                </Header>
            </AppProvider>
        </View>
    );
}

export default App;