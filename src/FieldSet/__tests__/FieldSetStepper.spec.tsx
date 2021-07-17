// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import FieldSetStepper from '../FieldSetStepper';

// Initial Contexts
import { StepperContext } from '../../helpers/context';

const { root, row } = {
  root: 'rootClassName',
  row: 'rowClassName',
};

describe('FieldSetStepper', () => {
    it('mounts with single field (control)', () => {
      const schema = {
        type: 'object',
        properties: {
          name: {
            'type': 'string',
            'title': 'Name',
          },
        },
      };

      const uiSchema = {
        'ui:page': {
            'ui:layout': 'steps',
            'props': {
              'includeSkipButton': false,
              'ui:schemaErrors': true
            }
        }
      };

      const data = { name: 'Bob' };

      // act
      const wrapper = mount(
        <StepperContext.Provider value={[1, false] as any}>
            <FieldSetStepper 
            classes={{ row }}
            schema={schema}
            data={data}
            path={''}
            uiSchema={uiSchema}
            xhrSchema={{}}
            onKeyDown={jest.fn}
            onChange={jest.fn}
            onXHRSchemaEvent={jest.fn}
            id={'1'}
            idxKey={'1'}
            validation={{}}
            isTabContent={false}
            tabKey={''}
            />
        </StepperContext.Provider>,
      );

      // check
      expect(wrapper).toHaveLength(1);
      const ffComp = wrapper.find('WithStyles(ForwardRef(Stepper))');
      expect(ffComp).toHaveLength(1);
      expect(ffComp.prop('activeStep')).toBe(1);
    });
});