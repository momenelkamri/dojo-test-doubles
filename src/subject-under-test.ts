export interface EmailService {
  send(to: string, message: string): string;
}

export interface User {
  id: string;
  email: string;
}

export interface UserRepository {
  findById(id: string): User | null;
}

export class UserNotifier {
  constructor(
    private repo: UserRepository,
    private emailService: EmailService,
  ) {}

  // orchestrate 
  notifyUser(userId: string, message: string): string | null {
    const user = this.repo.findById(userId); // query

    if (!user) {
      return null;
    }

    return this.emailService.send(user.email, message); // command
  }
}

/*
Bussiness case:

New user moet kunnen zich registreren met naam en emailadres. Als emailadres al voorkomt in onze database, moet de user een fout zien.

-----------------

Hoe op te lossen?

- welke data heb ik nodig?
- waar komt de data vandaan?

registratie.naam
naam van de user van de registratie request

registratie.emailadres
emailadres van de user van de registratie request

database.emailadreses
emailadreses  van de database 

- wat moet er met de data gebeuren?

1. checken of het registratie.emailadres in de database.emailadreses voorkomt
2. Als ja: foutmelding teruggeven aan de user in de response
3. Als nee: registratie.naam en registratie.emailadres  in de database opslaan 
3.a: als database opslaan niet lukt dan een foutmelding terug geven. 
4. registratie.response geeft terug 200 gelukt
*/

// type RegistratieRequest = {
//   name: string;
//   email: string;
// };

// type User = {
//   id: string;
//   name: string;
//   email: string;
// }

// type Users = User[];