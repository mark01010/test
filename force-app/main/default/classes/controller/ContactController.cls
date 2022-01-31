public with sharing class ContactController {
    @AuraEnabled(Cacheable = true)
    public static List<Contact> getListByAccountId (Id accountId) {
        return [
                SELECT Name, Phone, LeadSource
                FROM Contact
                WHERE AccountId =: accountId
        ];
    }

    @AuraEnabled
    public static void deleteRecord (String recordId){
        Contact contact = new Contact(Id = recordId);
        System.debug('Yes');
        delete contact;
    }

    @AuraEnabled
    public static void updateContact(Map<String, String> contactFieldsMap) {
        Contact contact = new Contact(Id = contactFieldsMap.get('id'));

//        if (contactFieldsMap.get('Name') != null) {
//            contact.Name = contactFieldsMap.get('Name');
//        }
        if (contactFieldsMap.get('Phone') != null) {
            contact.Phone = contactFieldsMap.get('Phone');
        }
        if (contactFieldsMap.get('Rating') != null) {
            contact.LeadSource = contactFieldsMap.get('LeadSource');
        }

        update contact;
    }
}