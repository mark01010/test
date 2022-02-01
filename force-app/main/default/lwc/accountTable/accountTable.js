import {LightningElement, wire, track} from 'lwc';
import getListAccount from '@salesforce/apex/AccountController.getList';
import {showErrorToast, showSuccessToast} from 'c/showToastService';
import deleteAccount from '@salesforce/apex/AccountController.deleteRecord';
import { refreshApex } from '@salesforce/apex';

export default class AccountTable extends LightningElement {
    @track accounts = [];
    @track editAccountModal;
    @track deleteAccountModal;
    currentAccountId;
    getListAccountResult;
    accountName;

    @wire (getListAccount)
    getAccounts(result) {
        this.getListAccountResult = result;
        if (result.data) {
            this.accounts = result.data.map(account => ({
                ...account,
                accountUrl: '/' + account.Id,
                numberContacts:  account.Contacts ? account.Contacts.length : 0,
                active: false
            }));
        } else if (result.error) {
            showErrorToast(result.error);
        }
    };

    openContacts(event) {
        this.currentAccountId = event.currentTarget.dataset.id;
        this.accounts = this.accounts.map(acc => {
            acc.active = acc.Id === event.currentTarget.dataset.id;
            return acc;
        });
    }

    deleteAccount() {
        deleteAccount({
            recordId : this.currentAccountId
        }).then(() => {
                showSuccessToast();
                refreshApex(this.getListAccountResult);
                this.template.querySelector('c-contact-table').hasContacts();
        }).catch(error => showErrorToast(error));
        this.closeDeleteModal();
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

    openDeleteModal (event) {
        this.accountName = event.currentTarget.dataset.name;
        this.currentAccountId = event.currentTarget.dataset.id;
        this.deleteAccountModal = true;
    }

    closeDeleteModal () {
        this.deleteAccountModal = false;
    }

}