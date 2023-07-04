import { ErrorResponse } from "@/lib/models";
import { useMemo } from "react";
import style from "./form-errors.module.scss";

type FormErrorsProps = {
  errorResponse: ErrorResponse | null;
};

export default function FormErrors({ errorResponse }: FormErrorsProps) {
  const formErrors = useMemo(() => {
    if (!errorResponse) {
      return null;
    }
    const errors: string[] = [];
    Object.entries(errorResponse.errors).forEach(([key, value]) => {
      errors.push(...value.map((error) => `${key} ${error}`));
    });
    return errors;
  }, [errorResponse]);
  if (!formErrors || formErrors?.length === 0) {
    return <></>;
  }
  const errorItems = formErrors.map((error) => (
    <li key={error} className={style.error}>
      {error}
    </li>
  ));
  return <ul className={style["list-error"]}>{errorItems}</ul>;
}
