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
    <div className={styles.tableContainer}>
      <table className={styles.transactions}>
        <thead>
          <tr className={classnames(styles.transactionHeader)}>
            <th>Date</th>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        {transactions.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={5} className={styles.noResult}>
                There are no results :(
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} onTransactionRemove={removeTransaction} />
            ))}
          </tbody>
        )}
      </table>
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
    </div>
  );
}
