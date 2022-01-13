public with sharing class ContactController {
    @AuraEnabled(Cacheable = true)
    public static List<Contact> getContactsListByAccountId (Id accountId) {
        return [
                SELECT Name
                FROM Contact
                WHERE AccountId =: accountId
        ];
    }
}