import { FC } from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
import { Flex, Select } from "antd";
import { useTranslation } from "react-i18next";

interface IProps {}

const LANGUAGES: any = {
  en: { nativeName: "En" },
  ua: { nativeName: "Ua" },
};

export const Header: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();

  const langOptions: { value: string, label: string }[] = Object.keys(LANGUAGES)
    .map((lng) => ({ value: lng, label: LANGUAGES[lng].nativeName }));

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0" }}>
        <Link to="/">
          Home
        </Link>
        <Flex gap="small">
          <Link to="/sign-in">
            {t("header.navigation.signIn")}
          </Link>
          <Link to="/sign-up">
            {t("header.navigation.signUp")}
          </Link>
        </Flex>
        <Select
          defaultValue={i18n.resolvedLanguage}
          style={{ width: 120 }}
          onChange={handleChange}
          options={langOptions}
        />
      </div>
    </>
  );
};
