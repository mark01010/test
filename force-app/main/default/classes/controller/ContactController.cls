public with sharing class ContactController {
    @AuraEnabled(Cacheable = true)
    public static List<Contact> getListByAccountId (Id accountId) {
        return [
                SELECT Name
                FROM Contact
                WHERE AccountId =: accountId
        ];
    }
}