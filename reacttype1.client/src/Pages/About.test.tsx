// File: reacttype1.client/src/Pages/About.test.tsx

import { render, screen } from '@testing-library/react';
import About from './About';
import '@testing-library/jest-dom';

describe('About Component', () => {
    test('renders About component', () => {
        render(<About />);

        // Check if the heading is present
        const headingElement = screen.getByText(/About/i);
        expect(headingElement).toBeInTheDocument();
        expect(headingElement.tagName).toBe('H3');
        expect(headingElement).toHaveStyle('text-align: center');

        // Check if the first paragraph is present
        const firstParagraph = screen.getByText(/This application is used to track leagues at the Frick Park Lawn Bowling Club./i);
        expect(firstParagraph).toBeInTheDocument();
        expect(firstParagraph).toHaveStyle('text-align: left');

        // Check if the second paragraph is present
        const secondParagraph = screen.getByText(/The FPLBC website is/i);
        expect(secondParagraph).toBeInTheDocument();
        expect(secondParagraph).toHaveStyle('text-align: left');

        // Check if the link is present and has the correct URL
        const linkElement = screen.getByRole('link', { name: /http:\/\/lawnbowlingpittsburgh.org/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'http://lawnbowlingpittsburgh.org');
    });
});