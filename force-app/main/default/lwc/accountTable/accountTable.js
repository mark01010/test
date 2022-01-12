import {LightningElement, wire} from 'lwc';
import getListAccount from '@salesforce/apex/AccountController.getList';

const columns = [
    {
        label: 'Number Contacts', fieldName: 'numberContacts', hideDefaultActions: true,
        typeAttributes: {
            label: {fieldName: 'Number Contacts'}
        }
    },
    {
        label: 'Name', fieldName: 'accountUrl', type: 'url', hideDefaultActions: true,
        typeAttributes: {
            label: {fieldName: 'Name'}
        }
    }
];

export default class AccountTable extends LightningElement {
    columns = columns;
    accounts = [];

    @wire (getListAccount)
    getAccounts({data, error}) {
        if (data) {
            this.accounts = data.map(account => ({
                ...account,
                accountUrl: '/' + account.Id,
                numberContacts:  account.Contacts ? account.Contacts.length : 0
            }));
        } else if (error) {
            console.log(error);
        }
    };
}