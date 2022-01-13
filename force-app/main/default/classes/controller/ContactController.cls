public with sharing class ContactController {
    @AuraEnabled(Cacheable = true)
    public static List<Contact> getListCurrentAccount (Id idAccount) {
        return [
                SELECT Name
                FROM Contact
                WHERE AccountId =: idAccount
        ];
    }
}