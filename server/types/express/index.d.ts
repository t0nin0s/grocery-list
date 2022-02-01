declare namespace Express {
  interface Request {
    idam?: {
      userDetails: IdamDetails;
    };
    test?: Item[];
    csrfToken?: () => string;
  }

  interface SessionData {
    items?: Item[];
  }
}