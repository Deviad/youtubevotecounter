import {IIndexable} from "typings/index";
import { isEqual } from "lodash";

export const isFinalCommentBatchReached = (guard:Array<Boolean>) => (currentValue: IIndexable)=> {

  const latestValue: IIndexable = [];

  if(isEqual(currentValue, latestValue[0])) {
      guard[0] = false;
  }


};
