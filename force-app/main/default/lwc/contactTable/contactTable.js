import {api, wire, LightningElement} from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getListByAccountId';


export default class ContactTable extends LightningElement {
    @api recordId;
    contacts = [];

    @wire(getContactList, {accountId: '$recordId'})
    getList({data, error}) {
        if (data) {
            this.contacts = data;
        } else if (error) {
            this.showErrorToast(error);
        }
    };

    get hasContacts() {
        return this.contacts.length > 0;
    }
}