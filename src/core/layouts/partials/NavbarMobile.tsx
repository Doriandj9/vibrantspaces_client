import { NavbarContext } from "@/core/contexts/LayoutContexs";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "@chakra-ui/react";
import { useContext } from "react";
import { LuChartBarStacked } from "react-icons/lu";


export const NavbarMobile = () => {
    const {isNavbarMobile} = useContext(NavbarContext);
    return (
        <>
        {
            isNavbarMobile && 
            <div className="border-b md:hidden dark:border-primary-darker">
                <nav className="px-2 py-4 space-y-2">
                    <AccordionRoot multiple collapsible >
                        <AccordionItem value={'1'}>
                            <AccordionItemTrigger _hover={{ backgroundColor: 'blackAlpha.100' }} padding={2}>
                                <LuChartBarStacked className="text-blue-500" />
                                <span className="">Contratos</span>
                            </AccordionItemTrigger>
                            <AccordionItemContent>
                                <div className="ms-4">a</div>
                                <div className="ms-4">b</div>
                            </AccordionItemContent>
                        </AccordionItem>
                        <AccordionItem value={'2'}>
                            <AccordionItemTrigger _hover={{ backgroundColor: 'blackAlpha.100' }} padding={2}>
                                <LuChartBarStacked className="text-blue-500" />
                                <span className="">Contratos</span>
                            </AccordionItemTrigger>
                            <AccordionItemContent>
                                <div className="ms-4">a</div>
                                <div className="ms-4">b</div>
                            </AccordionItemContent>
                        </AccordionItem>
                    </AccordionRoot>
                </nav>
            </div>
        }
        </>
    );
};