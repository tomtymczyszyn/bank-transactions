## How to run application

Copy file .env-example and rename it to .env

Run following commands in task directory to run application

    npm install
    npm run dev

Run following command in task directory to run API

    npm run server

Applcation will be available on http://127.0.0.1:5173/ (please check console as port may vary)

## Introduction

Application should contain list of bank transactions, based on design structure from _design.png_ file and contain following functionalities:

1.  Transactions fetched from API, displayed in table or list.
2.  Pagination (infinite-scroll or traditional, 20 items per page)
3.  Filtering by `beneficiary` field
4.  Form for adding new transaction to the list with basic non-empty fields validation. Add input fields for:
    - amount (must be positive)
    - account number (not empty, numbers)
    - address
    - description
    - date and id should be generated when submiting form
5.  Simple communicate when success/error after form submission.
6.  Removing transaction from the list (please add animation for that)

NOTE: Points 2-5 should be done on front-end side.

## API description

To run API, run following commands in task directory:

    npm install
    npm run server

Server will be available on http://localhost:3000.

Available endpoints:

> GET /transactions

## Technologies

Required technologies for development are _React_ and _Typescript_.

## Summary

Send us back your app with instruction how to run app and tests. Preferred way is to get URL to codesandbox or your public repository with project. In case of problems/questions feel free to ask.

**Good luck!**
