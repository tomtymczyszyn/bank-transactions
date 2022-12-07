import Transactions from './views/Transactions/Transactions';
import styles from './App.module.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './components/Container';

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Container>
        <div className={styles.viewContainer}>
          <Transactions />
        </div>
      </Container>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
