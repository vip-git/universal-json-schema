type Data = {
    startDate: string;
    endDate: string;
};

export type TranslateRangeDateProps = {
    data: Data;
    options: {
      useLocaleString: string;
    }
};

export type ReturnType = {
    formData: Data;
    uiData: string;
};
