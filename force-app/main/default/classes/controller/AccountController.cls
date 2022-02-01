public with sharing class AccountController {
    @AuraEnabled(Cacheable = true)
    public static List<Account> getList() {
        return [
                SELECT Name, Phone, Rating, (SELECT Id FROM Contacts)
                FROM Account
        ];
    }

    @AuraEnabled
    public static void updateAccount(String accountFieldsMap) {
        Account account = (Account)JSON.deserialize(accountFieldsMap, Account.class);
        update account;
    }

    @AuraEnabled
    public static void deleteRecord(String recordId) {
        delete new Account(Id = recordId);
    }
}