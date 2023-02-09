import { Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(@InjectInMemoryDBService('user') private readonly db: InMemoryDBService<User>) {
    this.db.create({
      username: 'a',
      password: 'a',
    });
    this.db.create({
      username: 'b',
      password: 'b',
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    const users = this.db.query(user => user.username === username);
    return users.length > 0 ? users[0] : undefined;
  }
}
