export type TranslateCurrencyProps = {
    value: string;
    options?: {
      useLocaleString: string;
    }
};

export type ReturnType = {
    formData: number | string;
    uiData: string;
};
