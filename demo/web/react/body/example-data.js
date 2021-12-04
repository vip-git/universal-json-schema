import example from '../../../examples';

const { simple, nested } = example[3];

export default ({
  simple: {
    title: 'Simple',
    examples: [
      simple,
    ],
  },
  nested: {
    title: 'Nested',
    examples: [
      nested,
    ],
  },
});
