import {LightningElement, wire} from 'lwc';
import getListAccount from '@salesforce/apex/AccountController.getList';

const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name', type: 'string' }
];

export default class AccountTable extends LightningElement {
    columns = columns;

    @wire (getListAccount)accounts;
}