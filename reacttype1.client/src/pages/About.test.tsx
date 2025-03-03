
import { test, expect } from 'vitest';
import { render  } from '@testing-library/react';
import About from './About';


test('App mounts properly', async () => {
    

    const { getByText }  = render(<About />)
    const ByRole = getByText('About');
    expect(ByRole).toBeTruthy();

    
})