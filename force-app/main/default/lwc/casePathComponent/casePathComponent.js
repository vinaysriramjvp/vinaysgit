import {LightningElement, wire, api} from 'lwc';
import {getRecord, notifyRecordUpdateAvailable} from 'lightning/uiRecordApi';
import case_OBJECT from '@salesforce/schema/Case';
import status_FIELD from '@salesforce/schema/Case.Status';
import {getPicklistValues, getObjectInfo} from 'lightning/uiObjectInfoApi';

const fields = [status_FIELD];
export default class CasePathComponent extends LightningElement {
  pickListOptions;
  @api recordId;
  currentstatus;
  error;
  // channelName = '/data/CaseChangeEvent';
  channelName = '/event/CaseUpdateEvent__e';
  @wire(getObjectInfo, {objectApiName: case_OBJECT})
  objectInfo;
  //fetch picklist options CaseChangeEvent
  @wire(getPicklistValues, {
    recordTypeId: '012000000000000AAA',
    fieldApiName: status_FIELD,
  })
  wirePickList(result) {
    // this.refreshItems = result;
    if (result.data) {
      this.pickListOptions = result.data.values;
      //this.getitems();
    }
    if (result.error) {
      this.error = result.error.body.message;
    }
  }

  @wire(getRecord, {recordId: '$recordId', fields}, {pickList: '$pickListOptions'})
  wiredAccount({error, data}) {
    if (data) {
      this.currentstatus = data.fields.Status.value;
      this.error = undefined;
    } else if (error) {
      this.error = error;
    }
    // notifyRecordUpdateAvailable([{recordId: this.recordId}]);
  }
  messageReceived(event) {
    alert('In message');
    const message = event.detail;
    notifyRecordUpdateAvailable([{recordId: this.recordId}]);

    console.log(message);
  }
}