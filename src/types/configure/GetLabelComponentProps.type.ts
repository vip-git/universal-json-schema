import { Dictionary, NumericDictionary } from "lodash";

export type GetLabelComponentProps = {
    htmlid: string;
    required: Dictionary<string> | NumericDictionary<string>;
    schema?: any;
    path: string;
};
