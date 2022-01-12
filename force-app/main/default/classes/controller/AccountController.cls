public with sharing class AccountController {
    @AuraEnabled(Cacheable = true)
    public static List<Account> getList () {
        return [
                SELECT Name, (SELECT Id FROM Contacts)
                FROM Account
        ];
    }
}