/**
 * Created by mzaluskyi on 14.01.2022.
 */

trigger AccountTrigger on Account (before insert, before update, before delete, after insert, after update, after delete, after undelete) {
    AccountHandler.handle(Trigger.new, Trigger.oldMap, Trigger.operationType);
}