// Library
import { Engine } from 'json-rules-engine';

export const RulesEngine = ({
    resolvedFacts = {},
}) => {   
      const translateConditionsToFacts = (conditions, givenFacts) => {
          const facts = { ...givenFacts };
          if (Array.isArray(conditions)) {
            for (const condition in conditions) {
              const cond = conditions[condition];
              if (cond.any) {
                return translateConditionsToFacts(cond.any, facts);
              }

              if (cond.all) {
                return translateConditionsToFacts(cond.all, facts);
              }

              if (cond.fact) {
                facts[cond.fact] = resolvedFacts[cond.fact];
              }
            }
          } else {
            if (conditions.any) {
              return translateConditionsToFacts(conditions.any, facts);
            }

            if (conditions.all) {
              return translateConditionsToFacts(conditions.all, facts);
            }
          }

          return facts;
      };                         

      const getFactsFromConditions = (conditions) => {
        const facts = {};
        return translateConditionsToFacts(conditions, facts);
      }                          

      const rulesParser = async (conditions) => {
        const engine = new Engine();
        // console.log('conditions is', conditions);
        engine.addOperator('isDefined', (factValue: string, jsonValue: string) => factValue ? true : false)
        engine.addOperator('isNotDefined', (factValue: string, jsonValue: string) => !factValue ? true : false) 
        engine.addOperator('caseInsenstiveEqual', (factValue: string, jsonValue: string) => factValue.toLowerCase() === jsonValue.toLowerCase())  

        engine.addRule({
          conditions,
          event: {
            type: 'isTrue',
            params: {
              message: true
            }
          }
        });

        // define fact(s) known at runtime
        const facts = getFactsFromConditions(conditions);
        // console.log('facts is',  facts);
        const rules = await engine.run(facts);
        const returnValue = rules.events.length >= 1;

        return returnValue;
      }; 
      
      return {
        rulesParser,
      }
}
