import { ActualEmailService } from "src/injected-classes/email-service.js";
import {UserNotifier, type User, type UserRepository} from "../src/subject-under-test.js";

class FakeUserRepository implements UserRepository {
  private users = new Map<string, User>();

  add(user: User) {
    this.users.set(user.id, user);
  }

  findById(id: string) {
    return this.users.get(id) ?? null;
  }
}

describe('usage of a Fake', () => {
  it('notifyUser does not get user data from actual DB', () => {
    // my test goes here.

    // arrange
    const fakeRepo = new FakeUserRepository();

    const actualEmailService = new ActualEmailService();

    fakeRepo.add({ id: 'user-123', email: 'user123@example.com' });
    
    const userNotifier = new UserNotifier(fakeRepo, actualEmailService);
    
    // act
    const result = userNotifier.notifyUser('user-123', 'Hello, User 123!');

    // assert
    expect(result).toStrictEqual('Email sent to user123@example.com: Hello, User 123!');
  });
});