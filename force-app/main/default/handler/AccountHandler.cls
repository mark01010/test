/**
 * Created by mzaluskyi on 14.01.2022.
 */

public with sharing class AccountHandler {
    public static void handle(List<Account> records, Map<Id, Account> oldRecords, TriggerOperation operation) {
        switch on operation {
            when BEFORE_INSERT {
            }
            when BEFORE_UPDATE {
            }
            when AFTER_INSERT {
            }
            when AFTER_UPDATE {
            }
            when BEFORE_DELETE {
            }
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