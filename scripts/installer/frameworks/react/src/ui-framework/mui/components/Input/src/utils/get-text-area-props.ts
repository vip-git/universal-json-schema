export default (widget) => (widget === 'textarea' 
  ? ({
    multiline: true,
    rows: 5,
  }) : ({

  }));
