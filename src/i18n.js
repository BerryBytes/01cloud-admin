import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import translationEng from "./locales/en/translation.json";
import translationHin from "./locales/hin/translation.json";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    keySeparator: '.',

    interpolation: {
      escapeValue: false
    },
    ns: ["translations"],
    defaultNS: "translations",
    resources: {
        en: { translations: translationEng },
        hin: { translations: translationHin }
    },
  });

export default i18n;