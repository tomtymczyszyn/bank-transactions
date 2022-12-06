import { useEffect, useState } from 'react';
import { API_URL } from '../constants/config';
import { parseLinkHeader } from '../helpers/requests';

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

export type Query = string | undefined;

function useTransactions(defaultQuery: Query) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
      // TODO: handle error
      .catch(() => {
        // we could send error details to some error logging service (like Sentry)
        setPagination({});
        setTransactions([]);
      });
  }

  useEffect(getTransactions, []);

  return {
    transactions,
    getTransactions,
    pagination,
  };
}

export default useTransactions;
