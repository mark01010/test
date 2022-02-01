import {api, LightningElement} from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import LEADSOURCE_FIELD from '@salesforce/schema/Contact.LeadSource';
import {showErrorToast, showSuccessToast} from 'c/showToastService';
import updateContact from '@salesforce/apex/ContactController.updateContact';

export default class ContactEditModal extends LightningElement {
    // nameField = NAME_FIELD;
    phoneField = PHONE_FIELD;
    leadSourceField = LEADSOURCE_FIELD;
    contactData = {};

    @api recordId;

    handleSelect(event) {
        this.contactData[event.target.fieldName] = event.target.value;
        this.contactData['id'] = this.recordId;
    }

    updateData() {
        updateContact({
            contactFieldsMap : JSON.stringify(this.contactData)
        }).then(() => {
            showSuccessToast();
            this.dispatchEvent(new CustomEvent('update'));
        }).catch(error => showErrorToast(error));
    }

    closeEditModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}