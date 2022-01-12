public with sharing class AccountController {
    @AuraEnabled(Cacheable = true)
    public static List<Account> getListAccount () {
        return [SELECT Id, Name FROM Account];
    }
}