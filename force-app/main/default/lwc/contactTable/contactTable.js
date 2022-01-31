import {api, wire, LightningElement} from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getListByAccountId';
import deleteContact from '@salesforce/apex/ContactController.deleteRecord';
import {showErrorToast, showSuccessToast} from 'c/showToastService';
import { refreshApex } from '@salesforce/apex';

export default class ContactTable extends LightningElement {
    @api accountRecordId;
    contacts = [];
    wiredResult;
    editContactModal;
    recordId;

    @wire(getContactList, {accountId : '$accountRecordId'})
    getList(result) {
        this.wiredResult = result;
        if (result.data) {
            this.contacts = result.data.map(contact => ({
                ...contact,
                contactUrl: '/' + contact.Id
            }));
        } else if (result.error) {
            showErrorToast(result.error);
        }
    };

    deleteCurrentContact(event){
        deleteContact({recordId : event.currentTarget.dataset.id})
            .then(() => {
                showSuccessToast();
                refreshApex(this.wiredResult);
                })
            .catch(error => showErrorToast(error));
    }

    get hasContacts() {
        return this.contacts.length > 0;
    }

    openContactEditModal(event) {
        this.editContactModal = true;
        this.recordId = event.currentTarget.dataset.id
        console.log(this.recordId);
    }

    closeContactEditModal() {
        this.editContactModal = false;
    }

    refreshContactTable() {
        refreshApex(this.wiredResult);
        this.editContactModal = false;
    }
}