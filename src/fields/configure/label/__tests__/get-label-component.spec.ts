// Material UI
const InputLabel = require('@material-ui/core/InputLabel').default

// Internal
import getLabelComponent from '../get-label-component';


describe('getLabelComponent', () => {
  it('returns InputLabel by default', () => {
    const LabelComponent = getLabelComponent({ schema: { } });
    expect(LabelComponent.id).toBe(InputLabel.id);
  });
});
