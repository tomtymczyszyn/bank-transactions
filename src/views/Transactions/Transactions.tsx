import React, { ReactElement, useState } from 'react';
import classnames from 'classnames';
import { TransactionForm } from '../../features/transactions/components/TransactionForm';
import { TransactionsFilters } from '../../features/transactions/components/TransactionsFilters';
import { TransactionsTable } from '../../features/transactions/components/TransactionsTable';
import useTransactions from '../../hooks/useTransactions';
import { formatAmount } from '../../utils/formatters';
import styles from './Transactions.module.css';

type Balance = number | undefined;

const TRANSACTIONS_LIMIT_PER_PAGE = 20;
const DEFAULT_TRANSACTION_QUERY = `?_page=1&_limit=${TRANSACTIONS_LIMIT_PER_PAGE}&_sort=date&_order=desc`;

function Transactions(): ReactElement {
  const { transactions, pagination, getTransactions, addTransaction, removeTransaction } =
    useTransactions(DEFAULT_TRANSACTION_QUERY);

  const [balance, setBalance] = useState<Balance>(5000);

  return (
    <div>
      <h1 className={styles.header}>Transactions</h1>
      <div>
        <div className={styles.topSection}>
          <div className={classnames(styles.topSectionSide, styles.addTransaction)}>
            <div className={styles.topSectionHeader}>Add new transaction:</div>
            <TransactionForm onSubmit={addTransaction} />
          </div>
          <div className={classnames(styles.topSectionSide, styles.topSectionBalanceFilters)}>
            <div className={styles.balance}>
              <div className={styles.topSectionHeader}>Balance:</div>
              <div className={styles.balanceValue}>{formatAmount(balance)}</div>
            </div>
            <div className={styles.filters}>
              <div className={styles.topSectionHeader}>Filters:</div>
              <TransactionsFilters getTransactions={getTransactions} />
            </div>
          </div>
        </div>
        <h2 className={styles.sectionHeader}>Transactions history</h2>
        {transactions && (
          <TransactionsTable
            transactions={transactions}
            pagination={pagination}
            getTransactions={getTransactions}
            removeTransaction={removeTransaction}
          />
        )}
      </div>
    </div>
  );
}

export default Transactions;
