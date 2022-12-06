import { ReactElement } from 'react';
import { Pagination, Transaction } from '../../hooks/useTransactions';
import Button from '../Button/Button';
import TransactionRow from './TransactionRow';
import styles from './TransactionsTable.module.css';

type TransactionTableProps = {
  transactions: Transaction[];
  pagination?: Pagination;
  getTransactions: (url: string | undefined) => void;
};

function TransactionsTable({ transactions, pagination = {}, getTransactions }: TransactionTableProps): ReactElement {
  return (
    <div className={styles.transactions}>
      <div className={`${styles.transactionRow} ${styles.transactionHeader}`}>
        <div>Date</div>
        <div>Name</div>
        <div>Description</div>
        <div>Amount</div>
      </div>
      {transactions.map((transaction) => (
        <TransactionRow key={transaction.id} transaction={transaction} />
      ))}
      <div>
        {!!pagination.prev && (
          <Button
            onClick={() => {
              getTransactions(pagination.prev);
            }}
          >
            Prev page
          </Button>
        )}
        {!!pagination.next && (
          <Button
            onClick={() => {
              getTransactions(pagination.next);
            }}
          >
            Next page
          </Button>
        )}
      </div>
    </div>
  );
}

export default TransactionsTable;
