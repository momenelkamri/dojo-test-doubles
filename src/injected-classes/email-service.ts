import type {EmailService} from "../subject-under-test.js";

export class ActualEmailService implements EmailService {
  send(to: string, message: string): string {
    // Imagine this sends an actual email.
    const logMessage = `Email sent to ${to}: ${message}`;
    console.log(logMessage);

    return logMessage;
  }
}
