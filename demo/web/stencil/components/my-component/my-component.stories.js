import { html } from 'lit-html';

export default {
  title: 'Components/My component',
  component: 'my-component', // which is also found in the `custom-elements.json`
  argTypes: {
    first: { control: { type: 'text' } },
    middle: { control: { type: 'text' } },
    last: { control: { type: 'text' } },
  }
};

export const basic = ({ first, middle, last }) => html`
<my-component first="${first}" middle="${middle}" last="'Don't call me a framework' JS"></my-component>
`;
basic.args = { 
    first: "Stencil", 
    middle: "😎",
    last: "'Don't call me a framework' JS",
};