export class User {
  firstName: String;
  lastName: String;
  imageUrl: String;
  age: Number;
  email: String;
  phone: String;
  company: String;
  address: {
    street: String,
    city: String,
    zip: String
  };

  constructor(data: any) {
    // copy over all properties
    Object.assign(this, data);
  }
}
