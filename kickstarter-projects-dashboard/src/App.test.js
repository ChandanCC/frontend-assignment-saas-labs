import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should display project data after loading', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    // Check if project table headers are rendered
    expect(screen.getByText(/S\.No/i)).toBeInTheDocument();
    expect(screen.getByText(/Percentage funded/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount pledged/i)).toBeInTheDocument();

    // Check if the first project data is rendered
    const firstProjectRow = screen.getByText(/186/i);
    expect(firstProjectRow).toBeInTheDocument();
  });

  it('should render pagination with correct number of pages', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    // Check if pagination is present
    expect(screen.getByRole('navigation', { name: /Pagination/i })).toBeInTheDocument();

    // Check if pagination info is correct
    expect(screen.getByText(/Page 1 of 21/i)).toBeInTheDocument();
  });

  it('should change the page correctly when next button is clicked', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    const nextButton = screen.getByTestId('next-btn');
    fireEvent.click(nextButton);

    // Check if page info updates
    expect(screen.getByText(/Page 2 of 21/i)).toBeInTheDocument();

    // Check if new set of projects is displayed
    expect(screen.queryByTitle(/^0$/i)).not.toBeInTheDocument();
    expect(screen.getByTitle(/^5$/i)).toBeInTheDocument();
  });

  it('should change the page correctly when previous button is clicked', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    const nextButton = screen.getByTestId('next-btn');
    fireEvent.click(nextButton);

    const prevButton = screen.getByTestId('prev-btn');
    fireEvent.click(prevButton);

    // Check if page info updates
    expect(screen.getByText(/Page 1 of 21/i)).toBeInTheDocument();

    // Check if the first set of projects is displayed again
    expect(screen.getByText(/186/i)).toBeInTheDocument();
  });

  it('should disable previous button on the first page', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('should disable next button on the last page', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    });

    // Navigate to last page
    const nextButton = screen.getByLabelText('Next page');
    for (let i = 0; i < 20; i++) {
      fireEvent.click(nextButton);
    }

    const lastPageNextButton = screen.getByLabelText('Next page');
    expect(lastPageNextButton).toBeDisabled();
  });
});
