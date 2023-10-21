import {useTranslation} from "react-i18next";

export const useTableData = () => {
    const {t} = useTranslation()

    const days = [
        { key: "Monday", label: t("days.monday") },
        { key: "Tuesday", label: t("days.tuesday") },
        { key: "Wednesday", label: t("days.wednesday") },
        { key: "Thursday", label: t("days.thursday") },
        { key: "Friday", label: t("days.friday") },
        { key: "Saturday", label: t("days.saturday") },
        { key: "Sunday", label: t("days.sunday") }
    ]

    const conversationStates = [
        { key: "Welcome", label: t("conversationStates.welcome") },
        { key: "ParentRegion", label: t("conversationStates.parentRegion") },
        { key: "ChildName", label: t("conversationStates.childName") },
        { key: "ChildAge", label: t("conversationStates.childAge") },
        { key: "LessThan3YearsOldChild", label: t("conversationStates.lessThan3YearsOldChild") },
        { key: "PreschoolStatus", label: t("conversationStates.preschoolStatus") },
        { key: "Survey", label: t("conversationStates.survey") },
        { key: "MainMenu", label: t("conversationStates.mainMenu") },
        { key: "Pause", label: t("conversationStates.pause") },
        { key: "SkipOrTakeSurvey", label: t("conversationStates.skipOrTakeSurvey") }
    ]

    const tableLabels = {
        name: t("tableLabels.name"),
        customersCount: t("tableLabels.customersCount"),
        description: t("tableLabels.description"),
        customerTraffics: t("tableLabels.customerTraffics"),
        conversationStates: t("tableLabels.conversationStates"),
        maxChildAge: t("tableLabels.maxChildAge"),
        minChildAge: t("tableLabels.minChildAge"),
        maxChildCount: t("tableLabels.maxChildCount"),
        minChildCount: t("tableLabels.minChildCount"),
        recommendationDays: t("tableLabels.recommendationDays"),
        recommendationFrequencies: t("tableLabels.recommendationFrequencies"),
        updatedAt: t("tableLabels.updatedAt"),
        createdAt: t("tableLabels.createdAt"),
    }

    const freequency = {
        daily: t("freequency.daily"),
        monthly: t("freequency.monthly"),

    }

    return {days, conversationStates, tableLabels, freequency}

}