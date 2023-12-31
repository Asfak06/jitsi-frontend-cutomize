/* eslint-disable @typescript-eslint/naming-convention */
import { adaptV4Theme, createTheme } from '@mui/material/styles';

import { ITypography, IPalette as Palette1 } from '../ui/types';

import { createColorTokens } from './utils';

declare module '@mui/material/styles' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Palette extends Palette1 {}

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface TypographyVariants extends ITypography {}
}

interface ThemeProps {
    breakpoints: Object;
    colorMap: Object;
    colors: Object;
    font: Object;
    shape: Object;
    spacing: Array<number>;
    typography: Object;
}

/**
 * Creates a MUI theme based on local UI tokens.
 *
 * @param {Object} arg - The ui tokens.
 * @returns {Object}
 */
export function createWebTheme({ font, colors, colorMap, shape, spacing, typography, breakpoints }: ThemeProps) {
    return createTheme(adaptV4Theme({
        spacing,
        palette: createColorTokens(colorMap, colors),
        shape,
        typography: {
            // @ts-ignore
            font,
            ...typography
        },
        breakpoints
    }));
}

/**
 * Find the first styled ancestor component of an element.
 *
 * @param {HTMLElement|null} target - Element to look up.
 * @param {string} cssClass - Styled component reference.
 * @returns {HTMLElement|null} Ancestor.
 */
export const findAncestorByClass = (target: HTMLElement | null, cssClass: string): HTMLElement | null => {
    if (!target || target.classList.contains(cssClass)) {
        return target;
    }

    return findAncestorByClass(target.parentElement, cssClass);
};

/**
 * Checks if the passed element is visible in the viewport.
 *
 * @param {Element} element - The element.
 * @returns {boolean}
 */
export function isElementInTheViewport(element?: Element): boolean {
    if (!element) {
        return false;
    }

    if (!document.body.contains(element)) {
        return false;
    }

    const { innerHeight, innerWidth } = window;
    const { bottom, left, right, top } = element.getBoundingClientRect();

    if (bottom <= innerHeight && top >= 0 && left >= 0 && right <= innerWidth) {
        return true;
    }

    return false;
}
