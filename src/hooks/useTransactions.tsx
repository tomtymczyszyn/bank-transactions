import { useEffect, useState } from 'react';
import toast from '../lib/toast';
import { API_URL } from '../constants/config';
import { parseLinkHeader } from '../utils/requests';

export type Transaction = {
  account: string;
  address: string;
  amount: number;
  beneficiary: string;
  date: string;
  description: string;
  id: number;
};

export type Pagination = {
  prev?: string;
  next?: string;
};

type AddTransaction = {
  amount: number;
  account: string;
  beneficiary: string;
  address: string;
  description: string;
};

export type Query = string | undefined;

function useTransactions(defaultQuery: Query) {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [pagination, setPagination] = useState<Pagination>({});

  function getTransactions(query: Query = defaultQuery): void {
    fetch(`${API_URL}/transactions${query}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Status: ${response.status}, Message: ${response.statusText}`);
        }
        setPagination(parseLinkHeader(response.headers.get('Link')));
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch(() => {
        // we could send error details to some error logging service (like Sentry)
        toast.error('Could not get transactions, something went wrong :(');
        setPagination({});
        setTransactions([]);
      });
  }

  useEffect(getTransactions, []);

  function addTransaction(values: AddTransaction): Promise<Transaction> {
    return new Promise((resolve) => {
      return fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, date: new Date().toISOString() }),
      })
        .then((response) => {
          if (response.status !== 201) {
            throw new Error(`Status: ${response.status}, Message: ${response.statusText}`);
          }
          return response;
        })
        .then((response) => response.json())
        .then((response) => {
          toast.success('Transaction was properly added!');
          getTransactions();
          resolve(response);
        })
        .catch(() => {
          // we could send error details to some error logging service (like Sentry)
          toast.error('Transaction was not added, something went wrong :(');
        });
    });
  }

  function removeTransaction(id: number): Promise<Transaction> {
    return new Promise((resolve) => {
      return fetch(`${API_URL}/transactions/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(`Status: ${response.status}, Message: ${response.statusText}`);
          }
          return response;
        })
        .then((response) => response.json())
        .then((response) => {
          toast.success('Transaction was properly removed!');
          resolve(response);
        })
        .catch(() => {
          // we could send error details to some error logging service (like Sentry)
          toast.error('Transaction was not removed, something went wrong :(');
        });
    });
  }

  return {
    transactions,
    pagination,
    getTransactions,
    addTransaction,
    removeTransaction,
  };
}

export default useTransactions;
