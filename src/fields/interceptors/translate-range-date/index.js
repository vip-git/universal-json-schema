const translateRangeDate = ({ data, options }) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const uiData = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
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
