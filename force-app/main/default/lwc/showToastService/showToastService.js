import {ShowToastEvent} from "lightning/platformShowToastEvent";

const showErrorToast = (error) => {
    const evt = new ShowToastEvent({
        title: 'Toast Error',
        message: error,
        variant: 'error',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
}

export {showErrorToast}