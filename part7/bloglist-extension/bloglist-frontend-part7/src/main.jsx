import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'
import theme from './theme'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </Router>,
)
