import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('PLN 100.00 = $28.57');
  });
  it('should render proper info for multiple amounts when PLN -> USD', () => {
    const cases = [
        { amount: 1,   expected: 'PLN 1.00 = $0.29' },
        { amount: 20,  expected: 'PLN 20.00 = $5.71' },
        { amount: 200, expected: 'PLN 200.00 = $57.14' },
        { amount: 345, expected: 'PLN 345.00 = $98.57' },
    ];

    for (const tc of cases) {
        render(<ResultBox from="PLN" to="USD" amount={tc.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(tc.expected);
        cleanup(); // odmontuj przed kolejną iteracją
    }
    });
  it('should render proper info for multiple amounts when USD -> PLN', () => {
    const cases = [
        { amount: 1,   expected: '$1.00 = PLN 3.50' },
        { amount: 20,  expected: '$20.00 = PLN 70.00' },
        { amount: 200, expected: '$200.00 = PLN 700.00' },
    ];

    for (const tc of cases) {
        render(<ResultBox from="USD" to="PLN" amount={tc.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(tc.expected);
        cleanup();
    }
    });
  it('should render the same values when from === to (PLN)', () => {
    render(<ResultBox from="PLN" to="PLN" amount={123} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('PLN 123.00 = PLN 123.00');
    });

    it('should render the same values when from === to (USD)', () => {
    render(<ResultBox from="USD" to="USD" amount={50} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('$50.00 = $50.00');
    });
  it('should render "Wrong value…" when amount is below zero', () => {
    render(<ResultBox from="PLN" to="USD" amount={-5} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('Wrong value…');
    });
});
