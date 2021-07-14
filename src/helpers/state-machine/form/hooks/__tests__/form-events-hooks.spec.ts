// Import
import useFormEvents from '../form-events.hooks';

describe('useFormEvents', () => {
    [
        'onMoveItemDown',
        'onDeleteItem',
        'onAddItem',
        'onAddNewProperty',
        'onRemoveProperty',
        'onUpdateKeyProperty',
        'onFormValuesChange',
        'onXHRSchemaEvent',
    ].map((actionName) => {
        it(`Should be able execute ${actionName}`, () => {
            const params = {
                stateMachineService: {
                    send: jest.fn(),
                },
                validation: {},
                formData: {},
                schema: {},
                uiData: {}, 
                uiSchema: {},
                xhrSchema: {},
                interceptors: {},
                submitOnEnter: {},
                onSubmit: {},
            };
            const sendSpy = jest.spyOn(params.stateMachineService, 'send');
            const formEvents = useFormEvents(params);
            formEvents[actionName]('test.me', 1)('hello', 'world');
            expect(sendSpy).toHaveBeenCalledTimes(1);
        });
    })
});
