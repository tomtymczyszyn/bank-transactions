import Transactions from './views/Transactions/Transactions';
import styles from './App.module.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.viewContainer}>
        <Transactions />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
