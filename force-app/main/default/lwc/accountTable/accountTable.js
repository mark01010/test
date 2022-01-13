import {LightningElement, wire} from 'lwc';
import getListAccount from '@salesforce/apex/AccountController.getList';
import getListContact from '@salesforce/apex/ContactController.getListCurrentAccount';

export default class AccountTable extends LightningElement {
    accounts = [];
    contacts = [];

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

    openContacts(event) {
        let accountId = event.currentTarget.dataset.id;
        console.log(accountId);
        getListContact({ idAccount: accountId })
            .then(result => {
                this.contacts = result;
            })
            .catch(error => {
                console.log(error);
            });
    }
}