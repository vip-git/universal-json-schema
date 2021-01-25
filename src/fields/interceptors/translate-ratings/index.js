const translateRatings = ({ value, options }) => {
  const formData = parseFloat(value);
  const uiData = Number(value).toFixed(2);
  return {
    formData,
    uiData,
  };
};

export default translateRatings;
