public with sharing class AccountHandler {
    public static void handle(List<Account> records, Map<Id, Account> oldRecords, TriggerOperation operation) {
        switch on operation {
            when AFTER_DELETE {
                deleteContactsByAccountId(oldRecords);
            }
        }
    }
    private static void deleteContactsByAccountId(Map<Id, Account> oldRecords){
        List<Contact> contactsForDelete = [
                SELECT Id
                FROM Contact
                WHERE AccountId IN :oldRecords.keySet()
        ];

        delete contactsForDelete;
    }
}