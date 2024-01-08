import {LightningElement, track, wire, api} from 'lwc';
import {loadScript} from 'lightning/platformResourceLoader';
import cometd from '@salesforce/resourceUrl/CometD';
import getSessionId from '@salesforce/apex/CometD_Controller.getSessionId';
export default class Cometdlwc extends LightningElement {
  @api channel;

  libInitialized = false;
  @track sessionId;
  @track error;

  @wire(getSessionId)
  wiredSessionId({error, data}) {
    if (data) {
      this.sessionId = data;
      this.error = undefined;
      loadScript(this, cometd).then(() => {
        this.initializecometd();
      });
    } else if (error) {
      console.log(error);
      this.error = error;
      this.sessionId = undefined;
    }
  }

  initializecometd() {
    if (this.libInitialized) {
      return;
    }
    this.libInitialized = true;
    var lwcThisContext = this;
    var cometdlib = new window.org.cometd.CometD();
    cometdlib.configure({
      url: window.location.protocol + '//' + window.location.hostname + '/cometd/51.0/',
      requestHeaders: {Authorization: 'OAuth ' + this.sessionId},
      appendMessageTypeToURL: false,
      //logLevel: 'debug',
    });
    cometdlib.websocketEnabled = false;
    cometdlib.handshake(function (status) {
      console.log('Channel Name  ', lwcThisContext.channel);
      if (status.successful) {
        console.log('in Successfull');
        // cometdlib.subscribe('/event/' + lwcThisContext.channel, function (message) {
        cometdlib.subscribe(
          lwcThisContext.channel,
          function (message) {
            console.log('subscribe');
            const selectedEvent = new CustomEvent('message', {detail: message});
            console.log('selectedEvent' + selectedEvent);
            lwcThisContext.dispatchEvent(selectedEvent);
          },
          function (subscribeReply) {
            console.log('subscribeReply error' + subscribeReply.error);
            console.log('strigfy' + JSON.stringify(subscribeReply));
            if (subscribeReply.successful === false) {
              console.log('in false');
              const selectedErrorEvent = new CustomEvent('message', {
                detail: {
                  message: '',
                  response: 'ERROR',
                  error: subscribeReply.error,
                },
              });
              lwcThisContext.dispatchEvent(selectedErrorEvent);
            }
          }
        );
      } else {
        console.error('Error in handshaking: ' + JSON.stringify(status));
      }
    });
  }
}