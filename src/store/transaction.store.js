import {create}  from  "zustand"
import {currency} from "../contants";


export const useTransactionsStore = create((set) => ({
   initial: 0,
   setInitial: (initial) => set(() => ({initial})),
   incomeDuringThisMonth: 0,
   outcomeDuringThisMonth: 0,
   setStatistics:(incomeDuringThisMonth, outcomeDuringThisMonth) => set(({incomeDuringThisMonth, outcomeDuringThisMonth})),
   income: [],
   outcome: [],
   setIncome: (income) => set(() => ({income})),
   setOutcome: (outcome) => set(() => ({outcome})),
}))