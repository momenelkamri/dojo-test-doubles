import {type EmailService, type User, UserNotifier, type UserRepository} from "../src/subject-under-test.js";

class TestFailedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "test failed";
  }
}

class EmailServiceMock implements EmailService {
  private expected?: {to: string; message: string};
  private returnValue = "";
  private called = false;

  expectSend(
    callInputParams: {to: string; message: string},
    returnValue: string,
  ) {
    this.expected = callInputParams;
    this.returnValue = returnValue;
  }
  verify() {
    if (!this.called) {
      throw new TestFailedError(
        `Expected method 'send' to be called. Method 'send' was never called.`,
      );
    }
  }

  send(to: string, message: string): string {
    if (!this.expected) {
      throw new Error(
        "Test cannot run if this.expected and this.returnValue are not set.",
      );
    }

    if (!this.inputsMatchExpected(to, message)) {
      const failingTestMessage = `Unexpected call: {to: ${to}, message: ${message}} does not match expected { to: ${this.expected.to}, message: ${this.expected.message}}`;

      throw new TestFailedError(failingTestMessage);
    }

    this.called = true;

    return this.returnValue;
  }

  private inputsMatchExpected(to: string, message: string): boolean {
    if (!this.expected) {
      return false;
    }

    return to === this.expected.to && message === this.expected.message;
  }
}

const stubRepo: UserRepository = {
  findById: (): User => {
    return {id: "1", email: "user@example.com"};
  },
};

describe("usage of a Mock", () => {
  // change 'it.todo(...' to 'it(...' and implement the test.
  it("notifyUser uses mocked collaborators", () => {
    // write your test here.

    const emailServiceMock = new EmailServiceMock();
    emailServiceMock.expectSend({ to: "user@example.com", message: "Hello" }, "Email sent");

    const userNotifier = new UserNotifier(stubRepo, emailServiceMock);

    userNotifier.notifyUser("1", "Hello");
    emailServiceMock.verify();

  });
});
