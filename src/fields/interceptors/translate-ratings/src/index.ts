// Types
import { TranslateRatingsProps, ReturnType } from './index.type';

const translateRatings = ({ value, options }: TranslateRatingsProps): ReturnType => {
  const formData = parseFloat(value);
  const uiData = Number(value).toFixed(2);
  return {
    formData,
    uiData,
  };
};

export default translateRatings;
