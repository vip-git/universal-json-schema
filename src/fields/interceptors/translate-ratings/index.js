const translateRatings = ({ value, options }) => {
  const formData = parseFloat(value);
  const uiData = Number(value);
  return {
    formData,
    uiData,
  };
};

export default translateRatings;
