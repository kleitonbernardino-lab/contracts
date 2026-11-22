#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ContractEvent {
    Deposit { account: [u8; 32], amount: i128 },
    Withdrawal { account: [u8; 32], amount: i128 },
    AdminTransferred { old_admin: [u8; 32], new_admin: [u8; 32] },
}
