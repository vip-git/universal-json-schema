// Library
import React from 'react';

// Material UI

// Context
import { StepperContext } from '@helpers/context';

// Internal
import FieldSetObject from './FieldSetObject';

// UI
import Framework from '@universal-schema/framework';

const {
  wrapperComponents: {
    Typography,
    Stepper,
    Step,
    StepLabel,
    Button,
    Div,
  },
  styles: {
    FormStepperStyles: useStyles
  }
} = Framework.uiFramework;

export default function HorizontalNonLinearStepperWithError(props) {
  const classes = useStyles();
  const { 
    schema = {}, 
    uiSchema, 
    path, 
    onNext, 
    onBack, 
    onSkip, 
    onSubmit,
  } = props;
  const [activeStep, buttonDisabled] = React.useContext(StepperContext) as any;
  const { 
    props: 
    { includeSkipButton, includeResetButton } = 
    { includeSkipButton: false, includeResetButton: false },
  } = uiSchema['ui:page'];
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = Object.keys(schema.properties).map((sp) => schema.properties[sp].title || sp);
  const stepContent = Object.keys(schema.properties).map((p, k) => {
    const newPath = path ? `${path}.${p}` : p;
    return {
      stepKey: k,
      stepPath: p,
      component: (compProps) => (
        <FieldSetObject
            {...compProps} 
            tabKey={p}
            isTabContent
        />
      ),
    };
  });
  const isStepOptional = (step) => step === 1;

  // const isStepFailed = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const getStep = (givenStep) => stepContent.find((s) => s.stepKey === givenStep);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(skipped.values());
      newSkipped.delete(activeStep);
    }

    setSkipped(newSkipped);
    if (activeStep === steps.length - 1) {
      return onSubmit();
    }
    return onNext(getStep(activeStep).stepPath, getStep(activeStep + 1).stepPath);
  };

  const handleBack = () => onBack(getStep(activeStep).stepPath, getStep(activeStep - 1).stepPath);

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
    return onSkip(getStep(activeStep).stepPath, getStep(activeStep + 1).stepPath);
  };

  const handleReset = () => getStep(0).stepPath;

  // make it configurable : alternativeLabel, nonLinear, orientation="vertical"
  return (
    <Div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: any = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant='caption' color='error'>
          //       Alert message
          //     </Typography>
          //   );
          // }
          // if (isStepFailed(index)) {
          //   labelProps.error = true;
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Div>
        {activeStep === steps.length ? (
          <Div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            {includeResetButton 
            && (
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            )}
          </Div>
        ) : (
          <Div>
            <Div className={classes.instructions}>
                {getStep(activeStep).component(props)}
            </Div>
            <Div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
            >
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {includeSkipButton && isStepOptional(activeStep) && (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                className={classes.button}
                disabled={buttonDisabled}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Div>
          </Div>
        )}
      </Div>
    </Div>
  );
}
