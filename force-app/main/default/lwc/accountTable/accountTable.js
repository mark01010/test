import {LightningElement, wire} from 'lwc';
import getListAccount from '@salesforce/apex/AccountController.getList';
import getListContact from '@salesforce/apex/ContactController.getListByAccountId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


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
            this.showErrorToast(error);
        }
    };

    openContacts(event) {
        let accountId = event.currentTarget.dataset.id;
        getListContact({ accountId: accountId })
            .then(result => this.contacts = result)
            .catch(error => this.showErrorToast(error));
    }

    showErrorToast(error) {
        const evt = new ShowToastEvent({
            title: 'Toast Error',
            message: error,
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}