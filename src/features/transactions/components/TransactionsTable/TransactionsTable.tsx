import { ReactElement } from 'react';
import { Pagination, Query, Transaction } from '../../../../hooks/useTransactions';
import { Button } from '../../../../components/Button';
import styles from './TransactionsTable.module.css';
import { TransactionRow } from './TransactionRow';

type TransactionTableProps = {
  transactions: Transaction[];
  pagination?: Pagination;
  getTransactions: (query: Query) => void;
};

export function TransactionsTable({
  transactions,
  pagination = {},
  getTransactions,
}: TransactionTableProps): ReactElement {
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
