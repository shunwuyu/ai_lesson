// 订阅者， 创建，删除，更新后去做一些事情
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { UserEntity } from './user.entity';

@EventSubscriber()
export class UserEntitySubsciber implements EntitySubscriberInterface<UserEntity> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }
    listenTo() {
        return UserEntity
    }
    async beforeInsert(event: InsertEvent<UserEntity>) {
        
    }
}