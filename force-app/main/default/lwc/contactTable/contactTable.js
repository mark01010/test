import {api, wire, LightningElement} from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getListByAccountId';
import deleteContact from '@salesforce/apex/ContactController.deleteRecord';
import {showErrorToast, showSuccessToast} from 'c/showToastService';
import { refreshApex } from '@salesforce/apex';

export default class ContactTable extends LightningElement {
    @api recordId;
    contacts = [];
    wiredResult;
    editContactModal;
    contactRecordId;
    deleteContactModal;

    @wire(getContactList, {accountId : '$recordId'})
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

    deleteCurrentContact(){
        deleteContact({recordId : this.contactRecordId})
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
        this.contactRecordId = event.currentTarget.dataset.id
    }

    closeContactEditModal() {
        this.editContactModal = false;
    }

    refreshContactTable() {
        refreshApex(this.wiredResult);
        this.editContactModal = false;
    }

    openDeleteModal (event) {
        this.contactRecordId = event.currentTarget.dataset.id;
        this.deleteContactModal = true;
    }

    closeDeleteModal () {
        this.deleteContactModal = false;
    }
}