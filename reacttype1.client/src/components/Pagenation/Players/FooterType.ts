import { UpdateFormData } from '@pages/League/Players/UpdateFormData.tsx';
import React, { SetStateAction } from "react";

export type FooterType = {
    range: number[],
    setPage: React.Dispatch<SetStateAction<number>>,
    page: number,
    slice: UpdateFormData[]
}