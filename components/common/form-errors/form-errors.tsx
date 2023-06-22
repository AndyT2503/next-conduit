import React, { useMemo } from "react";
import { ErrorResponse } from "@/lib/models";
import style from "./form-errors.module.scss";

export default function FormErrors({
  errorResponse
}: {
  errorResponse: ErrorResponse | null;
}) {
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
