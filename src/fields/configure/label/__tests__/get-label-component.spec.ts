// Material UI
// Internal
import getLabelComponent from '../get-label-component';

const InputLabel = require('@material-ui/core/InputLabel').default;

describe('getLabelComponent', () => {
  it('returns InputLabel by default', () => {
    const LabelComponent = getLabelComponent({ schema: { } });
    expect(LabelComponent.id).toBe(InputLabel.id);
  });
});
