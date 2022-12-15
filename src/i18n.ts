import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import translationEN from "./locale/en/transation.json";
import translationUA from "./locale/ua/transation.json";

const resources = {
  en: translationEN,
  ua: translationUA,
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    keySeparator: false,
    debug: false,

    backend: {
      loadPath: "/locale/{{lng}}/transation.json",
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
