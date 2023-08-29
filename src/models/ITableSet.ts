import { IIdValue } from "./IIdValue";

export interface ITableSet<T = string> {
    ids: string[];
    values: Record<string, T>;
}

export interface ITableSetWithOptions<T = string> extends ITableSet<T> {
    options: IIdValue<T>[];
}
