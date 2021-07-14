// Import
import useFormEvents from '../form-events.hooks';

describe('useFormEvents', () => {
    [
        { 
            name: 'onMoveItemDown',
            fn: (formEvents) => formEvents['onMoveItemDown']('test.me', 1)(),
            spy: (params) => jest.spyOn(params.stateMachineService, 'send')
        },
        { 
            name: 'onDeleteItem',
            fn: (formEvents) => formEvents['onDeleteItem']('test.me', 1)(),
            spy: (params) => jest.spyOn(params.stateMachineService, 'send')
        },
        { 
            name: 'onAddItem',
            fn: (formEvents) => formEvents['onAddItem']('test.me', 1)(),
            spy: (params) => jest.spyOn(params.stateMachineService, 'send')
        },
        { 
            name: 'onAddNewProperty',
            fn: (formEvents) => formEvents['onAddNewProperty']('test.me', 1)(),
            spy: (params) => jest.spyOn(params.stateMachineService, 'send')
        },
        { 
            name: 'onRemoveProperty',
            fn: (formEvents) => formEvents['onRemoveProperty']('test.me', 1)(),
            spy: (params) => jest.spyOn(params.stateMachineService, 'send')
        },
        { 
            name: 'onUpdateKeyProperty',
            fn: (formEvents) => formEvents['onUpdateKeyProperty']('test.me', 1)('hello', 'world'),
            spy: (params) => jest.spyOn(params.stateMachineService, 'send') 
        },
        { 
            name: 'onFormValuesChange',
            fn: (formEvents) => formEvents['onFormValuesChange']('test.me', 1)('hello', 'world'),
            spy: (params) => jest.spyOn(params.stateMachineService, 'send')
        },
        { 
            name: 'onXHRSchemaEvent',
            fn: (formEvents) => formEvents['onXHRSchemaEvent']('test.me', 1)('hello', 'world'),
            spy: (params) => jest.spyOn(params.stateMachineService, 'send')
        },
        { 
            name: 'onFormSubmit',
            fn: (formEvents) => formEvents['onFormSubmit']('test.me', 1),
            spy: (params) => jest.spyOn(params, 'onSubmit')
        },
        { 
            name: 'handleKeyEnter',
            fn: (formEvents) => formEvents['handleKeyEnter']({
                keyCode: 13,
            }),
            spy: (params) => jest.spyOn(params, 'onSubmit')
        },
        { 
            name: 'onTabChange',
            fn: (formEvents) => formEvents['onTabChange']('test.me', 1),
            spy: (params) => jest.spyOn(params.stateMachineService, 'send')
        },
    ].map((actionName) => {
        it(`Should be able execute ${actionName.name}`, () => {
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
                submitOnEnter: true,
                onSubmit: jest.fn(),
            };
            const formEvents = useFormEvents(params);
            const sendSpy = actionName['spy'](params);
            actionName['fn'](formEvents);
            expect(sendSpy).toHaveBeenCalledTimes(1);
        });
    })
});
