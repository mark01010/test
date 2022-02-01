import {api, LightningElement} from 'lwc';
import updateAccount from '@salesforce/apex/AccountController.updateAccount';
import {showErrorToast, showSuccessToast} from 'c/showToastService';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import RATING_FIELD from '@salesforce/schema/Account.Rating';

export default class AccountEditModal extends LightningElement {
    @api recordId;
    nameField = NAME_FIELD;
    phoneField = PHONE_FIELD;
    ratingField = RATING_FIELD;
    accountData = {};

    closeEditModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    updateData() {
        updateAccount({
            accountFieldsMap : JSON.stringify(this.accountData)
        }).then(() => {
            showSuccessToast();
            this.dispatchEvent(new CustomEvent('update'));
        }).catch(error => showErrorToast(error));
    }

    handleSelect(event) {
        this.accountData[event.target.fieldName] = event.target.value;
        this.accountData['Id'] = this.recordId;
    }
}