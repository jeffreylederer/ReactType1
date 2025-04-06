import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';


test('renders About', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <About />
        </MemoryRouter>
    );

    expect(screen.getByText(/About/i)).toBeTruthy();
});



