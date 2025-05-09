import { Accordion, IconButton, List, Menu, Portal } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { ButtonPrimary } from "./ButtonPrimary";

export const MenuMobile = () => {

    return (
        <>
            <Menu.Root>
                <Menu.Trigger asChild>
                    <IconButton bg={'white'} color={'black'} size={'2xl'}>
                        <LuMenu />
                    </IconButton>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content width={'80'}>
                            <Menu.Item value="home" fontSize={'xl'} asChild
                                borderBottom={'1px solid'}
                                borderColor={'gray.200'}
                                py={'4'}
                                fontWeight={'semibold'}
                            >
                                <Link to={'/'}>
                                    <AiOutlineHome /> Inicio
                                </Link>
                            </Menu.Item>
                            <Menu.Item value="new-txt" asChild
                            >
                                <ServicesOptions />
                            </Menu.Item>
                            <Menu.Item value="contact" mt={'4'} color={'white'} asChild>
                                <ButtonPrimary width={'full'}>
                                <MdOutlinePermPhoneMsg /> Contactanos
                            </ButtonPrimary>
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </>
    );
};


const ServicesOptions = () => {

    return (
        <>
            <Accordion.Root collapsible border={'none'}>
                <Accordion.Item value={'servicios'}
                    border={'none'}
                >
                    <Accordion.ItemTrigger
                        pl={'2'}
                        borderBottom={'1px solid'}
                        borderColor={'gray.200'}
                        fontSize={'lg'}
                    >
                        <PiSuitcaseSimpleBold /> Servicios
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody pl={'6'}>
                            <List.Root listStyle={'none'} >
                                <List.Item>
                                    <Link to={''}>
                                        1
                                    </Link>
                                </List.Item>
                                <List.Item>
                                    <Link to={''}>
                                        2
                                    </Link>
                                </List.Item>
                            </List.Root>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>
        </>
    );
};