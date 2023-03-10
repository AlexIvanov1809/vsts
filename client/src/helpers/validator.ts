interface IConfig {
  [key: string]: {
    [key: string]: {
      message: string;
      value?: number;
    };
  };
}

export interface IError {
  [key: string]: string;
}

export function validator<T>(data: T, config: IConfig): IError {
  const errors: IError = {};
  function validate(
    validateMethod: string,
    data: any,
    config: { message: string; value?: number },
  ) {
    if (typeof data === "object") return;
    let statusValidation;
    switch (validateMethod) {
      case "isRequired":
        statusValidation = data.trim() === "";
        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidation = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalSymbol = /[A-Z]+/g;
        statusValidation = !capitalSymbol.test(data);
        break;
      }
      case "isContainDigit": {
        const containDigit = /\d+/g;
        statusValidation = !containDigit.test(data);
        break;
      }
      case "onlyDigit": {
        const containDigit = /^\d+/g;
        const arrData = data.split("");
        data[0] === "+" ? arrData.splice(0, 1) : arrData.join("");
        statusValidation = !containDigit.test(arrData.join(""));
        break;
      }
      case "minMax": {
        statusValidation =
          (data[0] === "+" ? data.length - 2 : data.length) !== config.value;
        break;
      }
      default:
        break;
    }
    if (statusValidation) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod],
      );

      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
