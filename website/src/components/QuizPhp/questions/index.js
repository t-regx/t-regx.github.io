import match from "./match";
import match_howManyOccurrences from "./match_howManyOccurrences";
import match_optionalGroup from "./match_optionalGroup";
import match_optionalGroupLast from "./match_optionalGroupLast";
import match_resultError from "./match_resultError";
import match_resultSuccess from "./match_resultSuccess";
import match_returnAndRef from "./match_returnAndRef";
import matchAll_structure from "./matchAll_structure";
import matchAll_structurePatternOrder from "./matchAll_structurePatternOrder";
import matchAll_structureSetOrder from "./matchAll_structureSetOrder";
import replace_howManyOccurrences from "./replace_howManyOccurrences";
import replace_orderOfArguments_countLimit from "./replace_orderOfArguments_countLimit";
import replace_orderOfArguments_replaceSubject from "./replace_orderOfArguments_replaceSubject";
import replace_resultError from "./replace_resultError";
import replace_returnAndRef from "./replace_returnAndRef";
import replaceCallback_orderOfArguments_replaceSubject from "./replaceCallback_orderOfArguments_replaceSubject";

export default [
  match,
  replace_returnAndRef,
  match_returnAndRef,
  match_resultSuccess,
  replace_orderOfArguments_replaceSubject,
  replace_howManyOccurrences,
  replace_orderOfArguments_countLimit,
  match_howManyOccurrences,
  matchAll_structure,
  matchAll_structurePatternOrder,
  matchAll_structureSetOrder,
  match_resultError,
  replace_resultError,
  match_optionalGroup,
  match_optionalGroupLast,
  replaceCallback_orderOfArguments_replaceSubject,
];
