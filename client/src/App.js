import './App.css';
import Layout from './layout/main/Layout';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { ThemeProvider } from './providers/ThemeProvider';
import { SnackbarProvider } from './providers/SnackbarProvider';
import { UserProvider } from './users/providers/UserProvider';
import { SearchProvider } from './providers/SearchProvider';

function App() {
    return ( <
        BrowserRouter >
        <
        ThemeProvider >
        <
        SnackbarProvider >
        <
        UserProvider >
        <
        SearchProvider >
        <
        Layout >
        <
        Router / >
        <
        /Layout> < /
        SearchProvider > <
        /UserProvider> < /
        SnackbarProvider > <
        /ThemeProvider> < /
        BrowserRouter >
    );
}

export default App;