import React from 'react';
import Chatbot from './components/Chatbot';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div>
      <ToastContainer />
      <Chatbot />
    </div>
  );
};

export default App;