import { Button } from "@chakra-ui/react";
import { ButtonPrimaryType } from "../@types/core";



export const ButtonPrimary: React.FC<ButtonPrimaryType> = (props) => {

    return (
        <Button {...props} colorPalette={'bg'} bg={'primary.500'} _hover={{
            bg: 'primary.600'
        }} >
            {props.children}
        </Button>
    );
};