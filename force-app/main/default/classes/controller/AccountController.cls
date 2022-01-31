public with sharing class AccountController {
    @AuraEnabled(Cacheable = true)
    public static List<Account> getList () {
        return [
                SELECT Name, Phone, Rating, (SELECT Id FROM Contacts)
                FROM Account
        ];
    }

    @AuraEnabled(Cacheable = true)
    public static Account getAccountByIds (Id accountId) {
        return [
                SELECT Id, Name, Phone, Rating
                FROM Account
                WHERE Id =:accountId
        ];
    }

    @AuraEnabled
    public static void updateAccount(Map<String, String> accountFieldsMap) {
        Account account = new Account(Id = accountFieldsMap.get('id'));

        if (accountFieldsMap.get('Name') != null) {
            account.Name = accountFieldsMap.get('Name');
        }
        if (accountFieldsMap.get('Phone') != null) {
            account.Phone = accountFieldsMap.get('Phone');
        }
        if (accountFieldsMap.get('Rating') != null) {
            account.Rating = accountFieldsMap.get('Rating');
        }

        update account;
    }
}