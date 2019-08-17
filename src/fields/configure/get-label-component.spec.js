/* globals describe,it,beforeEach */
/* eslint-disable import/no-webpack-loader-syntax,import/no-extraneous-dependencies,import/no-unresolved,no-unused-expressions,max-len,no-unused-vars */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const inject = require('inject-loader!./get-label-component');

chai.use(sinonChai);

let InputLabelSpy;
let getLabelComponent;

chai.use(sinonChai);

describe('getLabelComponent', () => {
  beforeEach(() => {
    InputLabelSpy = sinon.spy();
    getLabelComponent = inject({
      '@material-ui/core/Input': {
        InputLabel: InputLabelSpy,
      },
    }).default;
  });
  it('returns InputLabel by default', () => {
    const LabelComponent = getLabelComponent({ schema: {} });
    expect(LabelComponent.id).to.equal(InputLabelSpy.id);
  });
});
