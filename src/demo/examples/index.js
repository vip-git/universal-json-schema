// Current Version
import simple from './simple';
import nested from './nested';
import single from './single';
import numbers from './numbers';
import arrays from './arrays';
import tabsUI from './tabs';
import stepsUI from './stepper';
import validation from './validation';
import budget from './budget';
import multipleChoice from './multiple-choice';
import radioChoice from './radio-choice';
import additionalProps from './additional-props';
import refrences from './refrences';
import alternatives from './alternatives';
import schemaDeps from './schema-dependencies';

// Version 2
import simpleV2 from './simple/version-2';

export default {
  3: {
    simple,
    single,
    nested,
    numbers,
    arrays,
    tabsUI,
    stepsUI,
    validation,
    budget,
    multipleChoice,
    radioChoice,
    additionalProps,
    refrences,
    alternatives,
    schemaDeps,
  },
  2: {
    simple: simpleV2,
    single,
    nested,
    numbers,
    arrays,
    validation,
    budget,
    multipleChoice,
    radioChoice,
  },
};
