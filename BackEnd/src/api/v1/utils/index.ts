

export class HelperFunction{
    
  public static validateEmail(email: string) {
    const re: RegExp = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}