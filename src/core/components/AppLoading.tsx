import { Dialog, Portal, Spinner } from "@chakra-ui/react";
import { createPortal } from "react-dom";



export const AppLoading = ({ loading }: { loading: boolean }) => {


    return createPortal(<>
        <div className="fixed top-0 left-0 min-h-screen">
            <Dialog.Root open={loading} closeOnEscape={false}>
                <Portal>
                    <Dialog.Backdrop zIndex={9999} />
                    <Dialog.Positioner>
                        <div className="flex items-center justify-center w-full h-screen">
                            <Spinner size={'lg'} color={'blue.700'} />
                        </div>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </div>
    </>, document.body);
};