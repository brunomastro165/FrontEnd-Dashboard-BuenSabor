import { ElementType, Dispatch, SetStateAction } from 'react';

export interface IButton {
    text: string,
    link: string,
    Icon: ElementType,
    active: string,
    setActive: Dispatch<SetStateAction<string>>,
    subButton: IButton[] | null,
    child: boolean,
}
