export class LoanAppError {

  code: number;
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  public static readonly INTERNAL_SERVER_ERROR = new LoanAppError(500, "Internal Server Error");
  public static readonly NOT_FOUND = new LoanAppError(404, "Resource Not Found");
  public static readonly UNPROCESSABLE_ENTITY = new LoanAppError(422, "Unprocessable Entity");
  public static readonly UNAUTHORIZED = new LoanAppError(401, "Unauthorized Request");
  public static readonly NO_CONNECTION = new LoanAppError(0, "No Connection !!");
}
