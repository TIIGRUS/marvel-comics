const getInputClassName = (hasError: boolean) =>
  `form__input form__input_wide${hasError ? " form__input_invalid" : ""}`;

export default getInputClassName;
