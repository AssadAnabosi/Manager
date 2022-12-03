import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationAR from "./locale/ar.json";
import translationEN from "./locale/en.json";

const resources = {
    ar: {
        translation: translationAR
    },
    en: {
        translation: translationEN
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ar",
        interpolation: {
            escapeValue: false
        },
        react:{
            useSuspense: false
        }
    });

export default i18n;