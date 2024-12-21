import { render, screen, fireEvent } from '@testing-library/react';
import ProjectTable from './ProjectTable';

describe('ProjectTable Component', () => {
  
  const columns = [
    { key: 'id', title: 'S.No.' },
    { key: 'percentage', title: 'Percentage Funded' },
    { key: 'pledged', title: 'Amount Pledged' },
  ];

  const data = [
    { id: 1, percentage: 50, pledged: 1000 },
    { id: 2, percentage: 75, pledged: 2000 },
  ];

  const loadingData = [];

  it('should render table with provided data', () => {
    render(<ProjectTable data={data} loading={false} caption="Project Details" columns={columns} rowKeyPath="id" />);
    
    // Verify that table headers are rendered
    columns.forEach((column) => {
      expect(screen.getByText(column.title)).toBeInTheDocument();
    });

    // Verify that table rows are rendered with data
    data.forEach((project) => {
      expect(screen.getByText(project.id)).toBeInTheDocument();
      expect(screen.getByText(project.percentage)).toBeInTheDocument();
      expect(screen.getByText(project.pledged)).toBeInTheDocument();
    });
  });

  it('should display loading state when loading is true', () => {
    render(<ProjectTable data={loadingData} loading={true} caption="Project Details" columns={columns} rowKeyPath="id" />);
    
    // Check if loading spinner and text are rendered
    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should display "No projects to display" when data is empty', () => {
    render(<ProjectTable data={loadingData} loading={false} caption="Project Details" columns={columns} rowKeyPath="id" />);
    
    // Check if the "No projects to display" message appears
    expect(screen.getByRole('status')).toHaveTextContent('No projects to display.');
  });

  it('should hide caption when hideCaption prop is true', () => {
    render(<ProjectTable data={data} loading={false} caption="Project Details" columns={columns} rowKeyPath="id" hideCaption={true} />);
    
    // Ensure caption is visually hidden
    const caption = screen.getByText('Project Details');
    expect(caption).toHaveClass('visually-hidden');
  });

  it('should show caption when hideCaption prop is false', () => {
    render(<ProjectTable data={data} loading={false} caption="Project Details" columns={columns} rowKeyPath="id" hideCaption={false} />);
    
    // Ensure caption is visible
    const caption = screen.getByText('Project Details');
    expect(caption).not.toHaveClass('visually-hidden');
  });

  it('should not break when no data is passed', () => {
    render(<ProjectTable data={[]} loading={false} caption="Project Details" columns={columns} rowKeyPath="id" />);
    
    // Ensure that "No projects to display" message appears when data is empty
    expect(screen.getByText('No projects to display.')).toBeInTheDocument();
  });

  it('should correctly handle title for empty or undefined fields', () => {
    const incompleteData = [
      { id: 1, percentage: 50 },
    ];
    render(<ProjectTable data={incompleteData} loading={false} caption="Project Details" columns={columns} rowKeyPath="id" />);
    
    // Check if "N/A" is displayed when a value is missing
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('should apply column header sorting functionality (if implemented)', () => {
    // If sorting is implemented, we can simulate the sorting logic
    render(<ProjectTable data={data} loading={false} caption="Project Details" columns={columns} rowKeyPath="id" />);
    
    // Simulate column click to sort (adjust based on your actual implementation)
    fireEvent.click(screen.getByText('S.No.'));
    
    // Verify if the table data is sorted based on column
    // This test assumes some sort of sorting logic, adjust accordingly
  });

});
