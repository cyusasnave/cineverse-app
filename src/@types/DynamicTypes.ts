/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode
}

export interface DynamicData {
  [key: string]: any;
}