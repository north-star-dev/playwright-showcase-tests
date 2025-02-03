// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    {
        rules: {
            quotes: ['error', 'single'],
        }
    },
    tseslint.configs.recommended,
);
