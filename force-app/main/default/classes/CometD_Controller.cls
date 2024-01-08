/**
 * @description       : this class is used in casePathComponent LWC for subscribing events
 * @author            : Vinay Sriram
 * @group             : 
 * @last modified on  : 06-04-2023
 * @last modified by  : Vinay Sriram
**/
public without sharing class CometD_Controller {
    @AuraEnabled(cacheable=true)
        public static String getSessionId() {
        return UserInfo.getSessionId();
    }
}