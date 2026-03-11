import type {EmailService, UserRepository} from "../src/subject-under-test.js";
import { UserNotifier } from '../src/subject-under-test.js';

const realDummyEmailService: EmailService = {} as EmailService;

const repo: UserRepository = {
  findById: () => null,
};

describe("usage of a Dummy", () => {
  // change 'it.todo(...' to 'it(...' and implement the test.
  it(
    "UserNotifier can handle not existing user (only possible test with provided dummies).",
    () => {
      // arrange
      const userNotifier = new UserNotifier(repo, realDummyEmailService);
      
      // act
      const result = userNotifier.notifyUser("1", "Hello, User!");

      // assert
      expect(result).toBeNull();

    },
  );
});
