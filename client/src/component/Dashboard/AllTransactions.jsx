import React from "react";
import { Link } from "react-router-dom";

const AllTransactions = ({ transactions, accountID }) => {
  console.log("Transactions ===> ", transactions);
  
  const account = {}
  return (
    <>
      {transactions?.length <= 0 ? (
        <h2 className="text-center text-red-500 text-3xl">This account does not have any transactions</h2>
      ) : (
        <>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  All Transactions
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  All transactions including expenses and income for this
                  account
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link
                  to={`/add-transaction/${accountID}/`}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Add New Transaction
                </Link>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Amount
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Note
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {transactions?.map((curr) => (

                           <tr key={curr._id} className={account?.color}>
                           <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                             <div className="flex items-center">
                               <div className="ml-4">
                                 <div className="font-medium text-gray-900">
                                   {curr?.name}
                                 </div>
                                 {/* <div className="text-gray-500">{curr?.notes}</div> */}
                               </div>
                             </div>
                           </td>
                           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                             <div className="text-gray-900">
                               {curr?.transactionType}
                             </div>
                             {/* <div className="text-gray-500">
                             {account?.department}nn
                           </div> */}
                           </td>
                           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                             <span className={`inline-flex 
                             ${curr.transactionType === "Income" ? `bg-green-100` : `bg-red-100`}
                              rounded-full px-2 text-xs font-semibold leading-5 text-green-800`}>
                               $ {curr?.amount}
                             </span>
                           </td>
                           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                             {curr?.notes}
                           </td>
                           <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                             <Link
                               to={`/update-transaction/${curr.id}`}
                               className="text-indigo-600 hover:text-indigo-900"
                             >
                               Edit
                               <span className="sr-only">, {curr?.name}</span>
                             </Link>
                           </td>
                         </tr>
                        ))}
                       
                        {/* end */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllTransactions;
