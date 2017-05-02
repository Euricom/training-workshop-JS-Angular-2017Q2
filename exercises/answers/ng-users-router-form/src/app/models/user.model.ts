export class User {
  id: String;
  firstName: String;
  lastName: String;
  imageUrl: String;
  age: Number;
  email: String;
  phone: String;
  company: String;
  address: {
    street?: String,
    city?: String,
    zip?: String,
  };

  constructor() {
    this.address = {};
  }
}
