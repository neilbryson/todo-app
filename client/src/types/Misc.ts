export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };
export type Writable<T> = { -readonly [P in keyof T]: T[P] };
export type RecursiveWritable<T> = { -readonly [P in keyof T]: RecursiveWritable<T[P]> };
