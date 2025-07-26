import { languageRulesDict } from "./LanguageDict";

const EMAIL_REGEX =  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const requireText = (fieldName, minLength=6) =>({
        required: `${fieldName} ${languageRulesDict['is required']}`,
        minLength: {
          value: minLength,
          message: `${fieldName} ${languageRulesDict['should be minimum']} ${minLength} ${languageRulesDict['characters long']}`,
    }
    })

export const requireEmail = () =>(
    {
        required: languageRulesDict['Email is required'],
        pattern: {value: EMAIL_REGEX, message: languageRulesDict['Email is invalid']},
      }
)