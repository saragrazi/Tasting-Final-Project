import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { node } from 'prop-types';
import
React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from 'react'

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleDarkMode = useCallback(
        () => setIsDark(prev => !prev),
        [setIsDark]
    );

    const theme = createTheme({
        palette: {
            mode: isDark ? 'dark' : 'light',      
        },
    });

    const value = useMemo(() => {
        return { isDark, toggleDarkMode };
    }, [isDark, toggleDarkMode]);

    return (
        <MuiThemeProvider theme={theme}>
            <ThemeContext.Provider value={value}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );

};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw Error("useTheme must use ThemeProvider");
    return context;
};

ThemeProvider.propTypes = {
    children: node.isRequired,
};