import React, { Suspense } from 'react'
import { AuthProvider } from './Components/context/AuthContext';
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import "tailwindcss/tailwind.css"
import './i18n'

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
)

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Suspense>,
    document.getElementById('root')
  );
