import {LightningElement, wire} from 'lwc';
import getListAccount from '@salesforce/apex/AccountController.getList';
import { showErrorToast } from 'c/showToastService';

export default class AccountTable extends LightningElement {
    accounts = [];
    currentAccountId;

    @wire (getListAccount)
    getAccounts({data, error}) {
        if (data) {
            this.accounts = data.map(account => ({
                ...account,
                accountUrl: '/' + account.Id,
                numberContacts:  account.Contacts ? account.Contacts.length : 0
            }));
        } else if (error) {
            this.showErrorToast(error);
        }
    };

    openContacts(event) {
        this.currentAccountId = event.currentTarget.dataset.id;
        console.log(this.currentAccountId);
    }
}