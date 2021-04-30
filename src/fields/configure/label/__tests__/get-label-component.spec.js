// const inject = require('inject-loader!./get-label-component');

// let InputLabelSpy;
// let getLabelComponent;

// describe('getLabelComponent', () => {
//   beforeEach(() => {
//     InputLabelSpy = sinon.spy();
//     getLabelComponent = inject({
//       '@material-ui/core/InputLabel': {
//         default: InputLabelSpy,
//       },
//     }).default;
//   });
//   it('returns InputLabel by default', () => {
//     const LabelComponent = getLabelComponent({ schema: { } });
//     expect(LabelComponent.id).to.equal(InputLabelSpy.id);
//   });
// });
