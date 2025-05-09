import { Controller } from "react-hook-form";
import { Box, Field, FileUpload, FileUploadRootProps, Icon } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";

type DisabledFileUpProps = keyof {
    onChange: CallableFunction;
};

type AppFileUploadProps = Omit<FileUploadRootProps, DisabledFileUpProps> & {
    verifyFiles?: (file: File) => boolean;
    name: string;
    label?: string;
    labelUpload?: string;
    descriptionUpload?: string;
    className?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    isRequired?: boolean;
};

export const AppFileUpload: React.FC<AppFileUploadProps> = ({ name, label, verifyFiles, className, control, isRequired, labelUpload, descriptionUpload, ...rootProps }) => {

    return (
        <>
            <div className={className}>
                <Controller
                    name={name}
                    control={control}
                    render={({ field, fieldState }) => {

                        return (
                            <Field.Root
                            invalid={!!fieldState.error}
                            {...rootProps}
                             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];

                                        if (verifyFiles && verifyFiles(file)) {
                                            field.onChange({ target: { value: file } });
                                            return;
                                        }

                                        if (!verifyFiles) {
                                            field.onChange({ target: { value: file } });
                                        }

                                    }
                                }}
                            >
                                <Field.Label 
                                >
                                    <strong>{label} {isRequired && <span className="text-red-500">*</span>}</strong>
                                </Field.Label>
                                <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={1}
                                
                                >
                                    <FileUpload.HiddenInput />
                                    <FileUpload.Dropzone
                                    onDrop={(e) => {
                                        const file = e.dataTransfer.files[0];
                                        if (file) {
                                            if (verifyFiles && verifyFiles(file)) {
                                                field.onChange({ target: { value: file } });
                                                return;
                                            }

                                            if (!verifyFiles) {
                                                field.onChange({ target: { value: file } });
                                            }
                                        }
                                    }}
                                    >
                                        <Icon size="md" color="fg.muted">
                                            <LuUpload />
                                        </Icon>
                                        <FileUpload.DropzoneContent>
                                            <Box>{labelUpload ?? 'Arrastre y suelte aquí para cargar o haga click aquí para buscar'}</Box>
                                            <Box color="fg.muted">{descriptionUpload ?? '.png, .jpg up to 5MB'}</Box>
                                        </FileUpload.DropzoneContent>
                                    </FileUpload.Dropzone>
                                    <FileUpload.List files={field.value instanceof File ? [field.value] : []} />
                                </FileUpload.Root>
                                <Field.ErrorText>
                                    {fieldState.error?.message}
                                </Field.ErrorText>
                            </Field.Root>

                        );
                    }}
                />

            </div>
        </>
    );

};