export const formatAccountsBalance = (locale: string, accounts: any[]) => {
    const totalBalance = accounts.reduce((total: number, account: any) => total + account.balance, 0);
    return formatBalance(locale, totalBalance, accounts[0]?.currency)
};

export const formatBalance = (locale: string, balance: number, currency: string) => {    
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency || ''
    }).format(balance);
};

export const statusBorderColor = (status: string) => {
    switch (status) {
        case 'Active':
        case 'Verified':
            return 'green';
        case 'Defaulted':
        case 'Pending Activation':
        case 'Pending Verification':
            return 'yellow';
        case 'NPA':
        case 'Blocked':
        case 'Rejected':
        case 'Inactive':
            return 'red';
        case 'Closed':
        case 'Expired':
            return 'gray';
        default:
            return 'gray';
    }
};