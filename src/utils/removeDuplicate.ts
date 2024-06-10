import { DynamicData } from "../@types/DynamicTypes";

export function removeDuplicateObjects(arr: DynamicData[]) {
  const uniqueObjects: DynamicData = {};
  const result: DynamicData[] = [];

  arr.forEach((obj: DynamicData) => {
    if (!uniqueObjects[obj.id]) {
      result.push(obj);
      uniqueObjects[obj.id] = true;
    }
  });

  return result;
}
