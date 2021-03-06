public with sharing class ContactController {
    @AuraEnabled(Cacheable = true)
    public static List<Contact> getListByAccountId(Id accountId) {
        return [
                SELECT Name, Phone, LeadSource
                FROM Contact
                WHERE AccountId =: accountId
        ];
    }

    @AuraEnabled
    public static void deleteRecord(String recordId) {
        delete new Contact(Id = recordId);
    }

    @AuraEnabled
    public static void updateContact(String jsonStr) {
        Contact contact = (Contact)JSON.deserialize(jsonStr, Contact.class);
        update contact;
    }
}