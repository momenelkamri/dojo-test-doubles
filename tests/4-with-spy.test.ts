import { ActualEmailService } from '../src/injected-classes/email-service.js';
import {
  UserNotifier,
  type EmailService,
  type User,
  type UserRepository,
} from "../src/subject-under-test.js";

class EmailServiceSpy implements EmailService {
  calls: {to: string; message: string}[] = [];

  constructor(private readonly actualEmailService: EmailService) {}

  send(to: string, message: string): string {
    this.calls.push({to, message});
    return this.actualEmailService.send(to, message);
  }
}

const stubRepo: UserRepository = {
  findById: (): User => {
    return {id: "1", email: "test@test.com"};
  },
};

describe("usage of a Spy", () => {
  // change 'it.todo(...' to 'it(...' and implement the test.
  it("spy on usages of EmailService", () => {
    //arrange
    const emailService = new ActualEmailService();
    const emailServiceSpy = new EmailServiceSpy(emailService);
    const userNotifier = new UserNotifier(stubRepo, emailServiceSpy);

    //act
    const result = userNotifier.notifyUser("1", "Hello, User!");

    //assert
    expect(emailServiceSpy.calls).toHaveLength(1);
    expect(emailServiceSpy.calls[0]).toEqual({to: "test@test.com", message: "Hello, User!"});
    expect(result).toStrictEqual("Email sent to test@test.com: Hello, User!");
  });
});
