export type AggregatorOptions = Record<string, any>;
export type AggregatorResult = any;

export type AggregationOptions<T> = {
  aggregatorFile: string;
  progress?: (payload: any) => void;
  timeoutToResendStatus?: number;
} & T;

export type AggregationResult<T> = {
  result: T;
  code?: number;
  signal?: string;
};

export type AggregationProcess<O = AggregatorOptions, R = AggregatorResult> = (
  options: AggregationOptions<O>
) => Promise<AggregationResult<R>>;

export type AggregationMessage = {
  action: "INIT" | "PROGRESS" | "DONE";
  payload: any;
  data: any;
};
