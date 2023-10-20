import * as jose from "jose";

export class JWT {
  static validateToken(token: any) {
    if (!token || typeof token !== "string") {
      return false;
    }

    try {
      const { exp, nbf } = jose.decodeJwt(token);
      const now = Math.round(Date.now() / 1000);

      return (!!exp && !!nbf && (exp - now > 0) && now >= nbf);
    } catch (error) {
      return false;
    }
  }

  static parseAndValidateToken(token: any): {
    isValid: () => boolean,
    isExpired: () => boolean,
    isActive: () => boolean,
    isError: boolean,
    error: Error | null,
    data: any,
  } {
    const obj: {
      isValid: () => boolean,
      isExpired: () => boolean,
      isActive: () => boolean,
      isError: boolean,
      error: Error | null,
      data: any,
    } = {
      isValid: () => false,
      isExpired: () => false,
      isActive: () => false,
      isError: false,
      error: null,
      data: null,
    };

    if (!token || typeof token !== "string") {
      obj.isError = true;
      obj.error = new Error("Invalid token: Token is empty or not string!");

      return obj;
    }

    try {
      const data = jose.decodeJwt(token);

      const { nbf = -1, exp = -1 } = data;

      const isValid = (): boolean => {
        return (nbf >= 0 && exp >= 0);
      };

      const isExpired = (): boolean => {
        const now = Math.round(Date.now() / 1000);

        return (isValid() && exp < now);
      };

      const isActive = (): boolean => {
        const now = Math.round(Date.now() / 1000);

        return (isValid() && !isExpired() && nbf <= now);
      };

      return { isValid, isExpired, isActive, isError: false, error: null, data };
    } catch (error) {
      obj.isValid = () => false;
      obj.isExpired = () => false;
      obj.isActive = () => false;
      obj.isError = true;
      obj.error = error as Error;
      obj.data = null;

      return obj;
    }
  }
}
