import { ActualEmailService } from "src/injected-classes/email-service.js";
import {UserNotifier, type User, type UserRepository} from "../src/subject-under-test.js";

const stubRepo: UserRepository = {
  findById: (): User => {
    return {id: "1", email: "test@test.com"};
  },
};

describe("usage of a Stub", () => {
  // change 'it.todo(...' to 'it(...' and implement the test.
  it("notifyUser gets data from stub", () => {
    // your test goes here.
    const userNotifier = new UserNotifier(stubRepo, new ActualEmailService());

    // act
    const result = userNotifier.notifyUser("2", "Hello, User!");

    // assert
    expect(result).toStrictEqual("Email sent to test@test.com: Hello, User!");
  });
});
