import { Field, InputGroup, InputGroupProps, Textarea, TextareaProps } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

type NotKeyUtil = keyof {
    name: string;
}

type AppInputType = Omit<TextareaProps, NotKeyUtil>

type AppTextareaProps = {
    name: string;
    fullWidth?: boolean;
    label?: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control?: any;
    startElement?: InputGroupProps['startElement'];
    textareaProps?: AppInputType;
    className?: string;
    isControl?: boolean;
    isRequired?: boolean;
};


export const AppTextarea: React.FC<AppTextareaProps> = ({ name, label, startElement, fullWidth, control, className, textareaProps, isRequired, isControl = true }) => {

    if (!isControl) {
        return (
            <div className={className}>
                <Field.Root
                >
                    <Field.Label>
                        <span className="font-bold">{label} {isRequired && <span className="text-red-500">*</span>} </span>

                    </Field.Label>
                    <InputGroup flex={'1'} startElement={startElement} width={fullWidth ? '100%' : ''}>
                        <Textarea maxLines={4} size={'xl'} {...textareaProps} resize={'none'} />
                    </InputGroup>
                </Field.Root>
            </div>
        );
    }

    return (
        <>
            <div className={className}>
                <Controller
                    name={name}
                    control={control}
                    render={(({ field, fieldState }) => (
                        <Field.Root
                            invalid={!!fieldState.error}

                        >
                            <Field.Label>
                                <span className="font-bold">{label} {isRequired && <span className="text-red-500">*</span>}</span>
                            </Field.Label>
                            <InputGroup flex={'1'} startElement={startElement} width={fullWidth ? '100%' : ''}>
                                <Textarea {...textareaProps} onChange={field.onChange} onBlur={field.onBlur} ref={field.ref} value={field.value ?? ''}
                                    resize={'none'}
                                    maxLines={4}
                                />
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