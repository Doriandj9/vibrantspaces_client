import { Field, Input, InputGroup, InputGroupProps, InputProps, ProgressCircle } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

type NotKeyUtil = keyof {
    name: string;
}

type AppInputType = Omit<InputProps, NotKeyUtil>

type AppInputProps = {
    name: string;
    fullWidth?: boolean;
    label?: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control?: any;
    startElement?: InputGroupProps['startElement'];
    inputProps?: AppInputType;
    className?: string;
    isControl?: boolean;
    isRequired?: boolean;
    isLoading?: boolean;
};


export const AppInput: React.FC<AppInputProps> = ({ name, label, startElement, fullWidth, control, className, inputProps, isRequired, isControl = true, isLoading }) => {

    if (!isControl) {
        return (
            <div className={className}>
                <Field.Root>
                    <Field.Label
                    >
                        <span className="font-bold">{label} {isRequired && <span className="text-red-500">*</span>} </span>
                    </Field.Label>
                    <InputGroup flex={'1'} startElement={isLoading ? <LoadingInput /> : startElement} width={fullWidth ? '100%' : ''}>
                        <Input disabled={isLoading} {...inputProps} />
                    </InputGroup>
                </Field.Root>
            </div>
        );
    }

    if (control) {
        delete inputProps?.defaultValue;
    }

    return (
        <>
            <div className={className}>
                <Controller
                    name={name}
                    control={control}
                    render={(({ field, fieldState }) => (
                        <Field.Root invalid={!!fieldState.error}
                        >
                            <Field.Label>
                                <span className="font-bold">{label} {isRequired && <span className="text-red-500">*</span>}</span>

                            </Field.Label>
                            <InputGroup flex={'1'} startElement={isLoading ? <LoadingInput /> : startElement} width={fullWidth ? '100%' : ''}>
                                <Input disabled={isLoading} {...inputProps} onChange={field.onChange} onBlur={field.onBlur} ref={field.ref} value={field.value ?? ''} />
                            </InputGroup>
                            <Field.ErrorText>
                                {fieldState.error?.message}
                            </Field.ErrorText>
                        </Field.Root>

                    ))}
                />
            </div>
        </>
    );
};


export const LoadingInput = () => {

    return (
        <>
            <ProgressCircle.Root value={null} size="xs">
                <ProgressCircle.Circle>
                    <ProgressCircle.Track />
                    <ProgressCircle.Range stroke={'blue.600'} />
                </ProgressCircle.Circle>
            </ProgressCircle.Root>
        </>
    );
};