import {LightningElement, wire, track} from 'lwc';
import getListAccount from '@salesforce/apex/AccountController.getList';
import {showErrorToast, showSuccessToast} from 'c/showToastService';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

export default class AccountTable extends LightningElement {
    @track accounts = [];
    @track editAccountModal;
    @track deleteAccountModal;
    currentAccountId;
    getListAccountResult;

    @wire (getListAccount)
    getAccounts(result) {
        this.getListAccountResult = result;
        if (result.data) {
            this.accounts = result.data.map(account => ({
                ...account,
                accountUrl: '/' + account.Id,
                numberContacts:  account.Contacts ? account.Contacts.length : 0
            }));
        } else if (result.error) {
            showErrorToast(result.error);
        }
    };

    openContacts(event) {
        this.currentAccountId = event.currentTarget.dataset.id;
    }

    deleteAccount(event) {
        deleteRecord(event.currentTarget.dataset.id)
            .then(() => {
                showSuccessToast();
                refreshApex(this.getListAccountResult);
            })
            .catch((error) => showErrorToast(error));
    }

    openAccountEditModal(event) {
        this.currentAccountId = event.currentTarget.dataset.id;
        this.editAccountModal = true;
    }

    closeAccountEditModal() {
        this.editAccountModal = false;
    }

    refreshAccountTable() {
        refreshApex(this.getListAccountResult);
        this.editAccountModal = false;
    }

    openDeleteModal () {
        this.deleteAccountModal = true;
    }

    closeDeleteModal () {
        this.deleteAccountModal = false;
    }

}