import { KeyboardEvent, ReactElement, useMemo, useState } from 'react';
import { Transaction } from '../../../../hooks/useTransactions';
import styles from './TransactionsTable.module.css';
import { CURRENCY_SYMBOL } from '../../../../constants/currency';

type TransactionProps = {
  transaction: Transaction;
};

export function TransactionRow({ transaction }: TransactionProps): ReactElement {
  const [showDetails, setShowDetails] = useState(false);

  function handleRowClick() {
    setShowDetails((state) => !state);
  }

  function handleRowKeyDown(e: KeyboardEvent) {
    if (['Space', 'Enter'].includes(e.code)) {
      e.preventDefault();
      setShowDetails((state) => !state);
    }
  }

  const formattedDate = useMemo(() => {
    return new Date(transaction.date).toLocaleString();
  }, [transaction]);

  const formattedAmount = useMemo(() => {
    return `${transaction.amount} ${CURRENCY_SYMBOL}`;
  }, [transaction]);

  return (
    <>
      <div
        className={styles.transactionRow}
        onClick={handleRowClick}
        onKeyDown={handleRowKeyDown}
        role="button"
        tabIndex={0}
      >
        <div>{formattedDate}</div>
        {/* TODO: show only beneficiary, show address and account only when in preview */}
        <div>{transaction.beneficiary}</div>

        <div>{transaction.description}</div>
        <div className={styles.transactionAmount}>{formattedAmount}</div>
      </div>
      {showDetails && (
        <div className={styles.transactionDetailsRow}>
          <div className={styles.transactionDetailsCell}>
            <div>{transaction.address}</div>
            <div>{transaction.account}</div>
          </div>
        </div>
      )}
    </>
  );
}
