import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";
import enJSON from "./locales/en/translation.json";
import uaJSON from "./locales/ua/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(I18NextHttpBackend)
  .init({
    fallbackLng: "en",
    resources: {
      en: { ...enJSON },
      ua: { ...uaJSON },
    }
  });


