import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './Components/LayoutArea/Layout/Layout'
import './index.css'
import { store } from './Redux/Store'
import { interceptor } from './Utils/Interceptor'
import { appTheme } from './Utils/Theme'

// Register axios interceptor: 
interceptor.create();

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={appTheme}>
        <BrowserRouter>
            <Provider store={store}>
                <Layout />
            </Provider>
        </BrowserRouter>
    </ThemeProvider>
)
