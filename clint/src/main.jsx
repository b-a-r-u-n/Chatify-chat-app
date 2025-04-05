import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './APP/store.js'

// createRoot(document.getElementById('root')).render(
//   // <StrictMode>
//   <Provider store={store}>
//     <App />
//   </Provider>
//   // </StrictMode>,
// )
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>
);
