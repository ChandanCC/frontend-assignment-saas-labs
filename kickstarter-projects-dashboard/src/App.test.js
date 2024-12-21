import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should display project data after loading', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/S\.No/i)).toBeInTheDocument();
    expect(screen.getByText(/Percentage Funded/i)).toBeInTheDocument(); 
    expect(screen.getByText(/Amount Pledged/i)).toBeInTheDocument();

    const firstProjectRow = screen.getByText(/^0$/i);
    expect(firstProjectRow).toBeInTheDocument();
  });

  it('should render pagination with correct number of pages', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    expect(screen.getByRole('navigation', { name: /Pagination/i })).toBeInTheDocument();

    const firstPageButton = screen.getByLabelText('Go to page 1');
    expect(firstPageButton).toHaveClass('pagination-page-button-active');

    expect(firstPageButton).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 3')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 4')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 5')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 21')).toBeInTheDocument();
  });

  it('should change the page correctly when next button is clicked', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    const nextButton = screen.getByTestId('next-btn');
    fireEvent.click(nextButton);

    const secondPageButton = screen.getByLabelText('Go to page 2');
    expect(secondPageButton).toHaveClass('pagination-page-button-active');

    expect(screen.queryByText(/^0$/i)).not.toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '5' })).toBeInTheDocument();
  });

  it('should change the page correctly when previous button is clicked', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    const nextButton = screen.getByTestId('next-btn');
    fireEvent.click(nextButton);

    const prevButton = screen.getByTestId('prev-btn');
    fireEvent.click(prevButton);

    const firstPageButton = screen.getByLabelText('Go to page 1');
    expect(firstPageButton).toHaveClass('pagination-page-button-active');

    expect(screen.getByText(/^0$/i)).toBeInTheDocument();
  });

  it('should disable previous button on the first page', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    const prevButton = screen.getByTestId('prev-btn');
    expect(prevButton).toBeDisabled();
  });

  it('should disable next button on the last page', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    const lastPageButton = screen.getByLabelText('Go to page 21');
    fireEvent.click(lastPageButton);

    const nextButton = screen.getByTestId('next-btn');
    expect(nextButton).toBeDisabled();
  });
});
