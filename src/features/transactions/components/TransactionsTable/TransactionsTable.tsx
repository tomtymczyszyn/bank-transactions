import { ReactElement } from 'react';
import classnames from 'classnames';
import { Pagination, Query, Transaction } from '../../../../hooks/useTransactions';
import { Button, VariantOptions } from '../../../../components/Button';
import styles from './TransactionsTable.module.css';
import { TransactionRow } from './TransactionRow';

type TransactionTableProps = {
  transactions: Transaction[];
  pagination?: Pagination;
  getTransactions: (query: Query) => void;
  removeTransaction: (id: number) => Promise<Transaction>;
};

export function TransactionsTable({
  transactions,
  pagination = {},
  getTransactions,
  removeTransaction,
}: TransactionTableProps): ReactElement {
  return (
    <>
      <div className={styles.transactions}>
        <div className={classnames(styles.transactionRow, styles.transactionHeader)}>
          <div>Date</div>
          <div>Name</div>
          <div>Description</div>
          <div>Amount</div>
          <div>Actions</div>
        </div>
        {transactions.length === 0 && <div className={styles.noResult}>There are no results :(</div>}
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} onTransactionRemove={removeTransaction} />
        ))}
      </div>
      <div className={styles.pagination}>
        <div>
          {!!pagination.prev && (
            <Button
              variant={VariantOptions.Primary}
              onClick={() => {
                getTransactions(pagination.prev);
              }}
            >
              &lt; Prev page
            </Button>
          )}
        </div>
        <div>
          {!!pagination.next && (
            <Button
              variant={VariantOptions.Primary}
              onClick={() => {
                getTransactions(pagination.next);
              }}
            >
              Next page &gt;
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
