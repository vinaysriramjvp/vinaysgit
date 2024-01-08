/**
 * @description       :
 * @author            : Vinay Sriram
 * @group             :
 * @last modified on  : 11-16-2023
 * @last modified by  : Vinay Sriram
 **/
import {LightningElement, api} from 'lwc';
import {updateRecord} from 'lightning/uiRecordApi';
import isupdate from '@salesforce/schema/Contact.Is_Contact_Updated__c';
import camId from '@salesforce/schema/Contact.Id';
import {CloseActionScreenEvent} from 'lightning/actions';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class UpdateCarItemTest extends LightningElement {
  @api recordId;
  @api async invoke() {
    console.log("Hi, I'm an action.");
    console.log('record' + this.recordId);
    const fields = {};
    fields[camId.fieldApiName] = this.recordId;
    fields[isupdate.fieldApiName] = true;
    const recordInput = {fields};
    await updateRecord(recordInput)
      .then(() => {
        console.log('updated');
        //this.sapspinner = false;
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Success',
            message: 'Opportunity Record Updated!',
            variant: 'success',
          })
        );
        this.dispatchEvent(new CloseActionScreenEvent());
      })
      .catch((error) => {
        //console.log('error' + error);
        //this.showToast('Error!!', error.body.message, 'error', 'dismissable');
      });
  }

  connectedCallback() {
    console.log('record' + this.recordId);
    console.log('record' + this.recordId);
    const fields = {};
    fields[camId.fieldApiName] = '0035i00000TH8vtAAD';
    fields[isupdate.fieldApiName] = true;
    const recordInput = {fields};
    updateRecord(recordInput)
      .then(() => {
        console.log('updated');
        //this.sapspinner = false;
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Success',
            message: 'Opportunity Record Updated!',
            variant: 'success',
          })
        );
        this.dispatchEvent(new CloseActionScreenEvent());
      })
      .catch((error) => {
        //console.log('error' + error);
        //this.showToast('Error!!', error.body.message, 'error', 'dismissable');
      });
  }
}