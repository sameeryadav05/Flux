import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer , Bounce  } from 'react-toastify';
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx'
import AuthProvider from './utils/AuthProvider.jsx';
import { Provider } from 'react-redux'
import { store } from './redux/store.js';
import ThemeProvider from './utils/ThemeProvider.jsx';


export const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(

    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
              />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)
