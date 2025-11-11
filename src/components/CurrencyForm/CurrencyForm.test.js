import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  it('should call action once on Convert click', () => {
    const action = jest.fn();

    render(<CurrencyForm action={action} />);

    // znajdź przycisk „Convert” po tekście
    const submitButton = screen.getByText(/convert/i);

    // zasymuluj kliknięcie użytkownika
    userEvent.click(submitButton);

    // sprawdź, że callback został wywołany raz
    expect(action).toHaveBeenCalledTimes(1);
  });
  it('should call action with proper data on submit', () => {
    const action = jest.fn();
    render(<CurrencyForm action={action} />);

    // pobierz pola po data-testid
    const amountField = screen.getByTestId('amount');
    const fromField = screen.getByTestId('from-select');
    const toField = screen.getByTestId('to-select');

    // ustaw wartości testowe
    userEvent.type(amountField, '100');
    userEvent.selectOptions(fromField, 'PLN');
    userEvent.selectOptions(toField, 'USD');

    // kliknij "Convert"
    const submitButton = screen.getByText(/convert/i);
    userEvent.click(submitButton);

    // sprawdź: jedno wywołanie i właściwy argument
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith({ amount: 100, from: 'PLN', to: 'USD' });
  });
  it('should call action with proper data for multiple cases', () => {
    const testCases = [
        { amount: '100', from: 'PLN', to: 'USD', expected: { amount: 100, from: 'PLN', to: 'USD' } },
        { amount: '20',  from: 'USD', to: 'PLN', expected: { amount: 20,  from: 'USD', to: 'PLN' } },
        { amount: '200', from: 'PLN', to: 'USD', expected: { amount: 200, from: 'PLN', to: 'USD' } },
        { amount: '345', from: 'USD', to: 'PLN', expected: { amount: 345, from: 'USD', to: 'PLN' } },
    ];

    for (const tc of testCases) {
        const action = jest.fn();
        render(<CurrencyForm action={action} />);

        const amountField = screen.getByTestId('amount');
        const fromField   = screen.getByTestId('from-select');
        const toField     = screen.getByTestId('to-select');
        const submitBtn   = screen.getByText(/convert/i);

        // ustaw wartości
        userEvent.type(amountField, tc.amount);
        userEvent.selectOptions(fromField, tc.from);
        userEvent.selectOptions(toField, tc.to);

        // submit
        userEvent.click(submitBtn);

        // asercje
        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith(tc.expected);

        // odmontuj przed kolejną iteracją
        cleanup();
    }
    });

});