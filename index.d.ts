/// <reference types="react" />
declare module "hooks/useForm/types" {
    export type FormField = {
        name?: string;
        placeholder?: string;
        label?: string;
        value?: string;
        validations?: RegExp[] | ((value: string) => boolean)[];
    } & ({
        type: "text" | "number" | "email" | "checkbox";
    } | {
        type: "select";
        options: Record<string, any>[];
    });
    export type FormFields = Record<string, FormField>;
    export type ReturnKeyType<T> = T extends string ? T : never;
}
declare module "components/Form/types" {
    import React from "react";
    export type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
        inputsRef: React.MutableRefObject<HTMLInputElement[]>;
    };
}
declare module "components/Form/index" {
    import { FormProps } from "components/Form/types";
    const Form: ({ children, inputsRef, ...props }: FormProps) => JSX.Element;
    export type { FormProps };
    export default Form;
}
declare module "components/Input/types" {
    import { FormField } from "hooks/useForm/types";
    export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, Extract<keyof FormField, "id" | "options" | "type">>;
    export interface InputComponentProps {
        id: string;
        label?: string;
        validations?: RegExp[] | ((value: string) => boolean)[];
    }
    export type ReturnedInput = (props: Omit<InputProps, keyof FormField | keyof InputComponentProps>) => JSX.Element;
}
declare module "components/Input/index" {
    import React from "react";
    import { InputProps, InputComponentProps, ReturnedInput } from "components/Input/types";
    const Input: React.ForwardRefExoticComponent<InputProps & InputComponentProps & React.RefAttributes<unknown>>;
    export type { InputProps, InputComponentProps, ReturnedInput };
    export default Input;
}
declare module "hooks/useForm/index" {
    import { ReturnKeyType, FormFields, FormField } from "hooks/useForm/types";
    import { FormProps } from "components/Form/index";
    import { ReturnedInput } from "components/Input/index";
    export default function useForm<T extends FormFields>(fields: T): {
        FormFields: Record<Capitalize<ReturnKeyType<keyof T>>, ReturnedInput>;
        Form: (props: Omit<FormProps, "inputsRef">) => JSX.Element;
    };
    export type { ReturnKeyType, FormFields, FormField };
}
declare module "App" {
    function App(): JSX.Element;
    export default App;
}
declare module "components/index" {
    export * from "components/Form/index";
    export * from "components/Input/index";
}
declare module "hooks/useAsync/types" {
    export type AsyncState<T = unknown, E extends Error = Error> = (Partial<T> & {
        status?: "loading" | undefined;
        error?: undefined;
    }) | (Partial<T> & {
        status: "error";
        error: E;
    }) | (T & {
        status: "loaded";
        error?: undefined;
    });
    export type UseAsyncState<T> = AsyncState<{
        data: T;
    }>;
}
declare module "hooks/useAsync/index" {
    import { UseAsyncState, AsyncState } from "hooks/useAsync/types";
    export function useAsync<T>(initialState?: UseAsyncState<T>): {
        isIdle: boolean;
        isLoading: boolean;
        isError: boolean;
        isSuccess: boolean;
        setData: (data: T) => void;
        setError: (error: Error) => void;
        error: Error | undefined;
        status: "loading" | "error" | "loaded" | undefined;
        data: T | undefined;
        run: (promise: Promise<T>) => Promise<T>;
        reset: () => void;
    };
    export type { AsyncState, UseAsyncState };
    export default useAsync;
}
declare module "hooks/usePrevious" {
    export default function usePrevious<T>(value: T): T;
}
declare module "hooks/index" {
    export * from "hooks/useAsync/index";
    export * from "hooks/useForm/index";
    export * from "hooks/usePrevious";
}
declare module "main" {
    export * from "components/index";
    export * from "hooks/index";
    export type { FormProps, InputComponentProps, InputProps, ReturnedInput, } from "components/index";
    export type { AsyncState, FormFields, FormField, ReturnKeyType, UseAsyncState, } from "hooks/index";
}
declare module "main2" { }
