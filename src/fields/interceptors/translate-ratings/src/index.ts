type translateRatingsProps = {
  value: string;
  options?: {}
};

const translateRatings = ({ value, options }: translateRatingsProps) => {
  const formData = parseFloat(value);
  const uiData = Number(value).toFixed(2);
  return {
    formData,
    uiData,
  };
};

export default translateRatings;
