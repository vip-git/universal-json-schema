// Lib
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// internal
import Form from './Form';

const queryClient = new QueryClient();

const AsyncForm = (props) => (
    <QueryClientProvider client={queryClient}>
        <Form {...props} />
    </QueryClientProvider>
);

export default AsyncForm;
