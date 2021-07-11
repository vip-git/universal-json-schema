import { TranslateRangeDateProps, ReturnType } from './index.type';

const translateRangeDate = ({ data, options }: TranslateRangeDateProps): ReturnType => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const uiData = `${
    startDate.toLocaleDateString(options.useLocaleString)
  } - ${
    endDate.toLocaleDateString(options.useLocaleString)
  }`;
  const formData = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
  return {
    formData,
    uiData,
  };
};

export default translateRangeDate;
