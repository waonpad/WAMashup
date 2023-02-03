import React from 'react';
import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes/';
import View from './View';

function App() {
    return (
        <View>
            <AppProvider>
                <AppRoutes />
            </AppProvider>
        </View>
    );
}

export default App;