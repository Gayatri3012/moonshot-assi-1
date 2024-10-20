import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/Root/RootLayout';
import './App.css';
import EmailList from './components/EmailList/EmailList';
import { EmailsProvider } from './store/emailContext';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      errorElement: <h1>Error</h1>,
      children: [
        { index: true, element: <EmailList />}
      ]
    }
  ])
  

  return (
    <EmailsProvider>
      <RouterProvider router={router} />
    </EmailsProvider>
    
  );
}

export default App;
