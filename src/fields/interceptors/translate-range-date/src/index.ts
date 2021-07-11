interface translateRangeDateProps {
  data: {
    startDate: string;
    endDate: string;
  };
  options: {
    useLocaleString: string;
  }
};

const translateRangeDate = ({ data, options }: translateRangeDateProps) => {
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
