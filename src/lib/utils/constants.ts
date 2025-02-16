export const countries = [
    { label: 'Bulgaria', value: 'bg' },
    { label: 'USA', value: 'usa' },
    { label: 'India', value: 'in' }
];

export const IDTypes = [{ value: 'passport', name: 'Passport' }, { value: 'dl', name: 'Driving Licence' }, { value: 'national_id', name: 'National ID' }, { value: 'egn', name: 'EGN' }];
export const documentTypes = [...IDTypes, { value: 'other', name: 'Other...' }];
