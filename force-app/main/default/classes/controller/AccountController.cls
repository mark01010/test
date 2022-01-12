public with sharing class AccountController {
    @AuraEnabled(Cacheable = true)
    public static List<Account> getList () {
        return [SELECT Id, Name FROM Account];
    }
}