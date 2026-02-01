interface Transaction {
  _id?: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  reason: string;
  referenceId?: string;
  createdAt: Date;
}

export interface Wallet {
  balance: number;
  transactions: Transaction[];
}
