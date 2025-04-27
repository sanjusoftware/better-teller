export const formatBalance = (locale: string, accounts: any[]) => {
    const totalBalance = accounts.reduce((total: number, account: any) => total + account.balance, 0);
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: accounts[0]?.currency || ''
    }).format(totalBalance);
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