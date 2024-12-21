import { render, screen, fireEvent } from '@testing-library/react';
import ProjectTable from './ProjectTable';

describe('ProjectTable Component', () => {
  const mockOnTableDataChange = jest.fn();
  
  const columns = [
    { key: 'id', title: 'S.No.', sorter: true },
    { key: 'percentage', title: 'Percentage Funded', sorter: true },
    { key: 'pledged', title: 'Amount Pledged', sorter: true },
  ];

  const data = [
    { id: 1, percentage: 50, pledged: 1000 },
    { id: 2, percentage: 75, pledged: 2000 },
  ];

  const loadingData = [];

  const defaultProps = {
    data,
    loading: false,
    caption: "Project Details",
    columns,
    rowKeyPath: "id",
    onTableDataChange: mockOnTableDataChange,
    sortConfig: { key: null, direction: null }
  };

  beforeEach(() => {
    mockOnTableDataChange.mockClear();
  });

  it('should render table with provided data', () => {
    render(<ProjectTable {...defaultProps} />);

    columns.forEach((column) => {
      expect(screen.getByText(column.title)).toBeInTheDocument();
    });

    data.forEach((project) => {
      expect(screen.getByText(project.id.toString())).toBeInTheDocument();
      expect(screen.getByText(project.percentage.toString())).toBeInTheDocument();
      expect(screen.getByText(project.pledged.toString())).toBeInTheDocument();
    });
  });

  it('should display loading state when loading is true', () => {
    render(<ProjectTable {...defaultProps} loading={true} data={loadingData} />);
    
    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should display "No projects to display" when data is empty', () => {
    render(<ProjectTable {...defaultProps} data={loadingData} />);
    
    expect(screen.getByRole('status')).toHaveTextContent('No projects to display.');
  });

  it('should hide caption when hideCaption prop is true', () => {
    render(<ProjectTable {...defaultProps} hideCaption={true} />);
    
    const caption = screen.getByText('Project Details');
    expect(caption).toHaveClass('visually-hidden');
  });

  it('should show caption when hideCaption prop is false', () => {
    render(<ProjectTable {...defaultProps} hideCaption={false} />);
    
    const caption = screen.getByText('Project Details');
    expect(caption).not.toHaveClass('visually-hidden');
  });

  it('should display sort icons correctly', () => {
    render(<ProjectTable {...defaultProps} sortConfig={{ key: 'percentage', direction: 'asc' }} />);
    
    expect(screen.getByRole('sort-ascending')).toBeInTheDocument();

    render(<ProjectTable {...defaultProps} sortConfig={{ key: 'percentage', direction: 'desc' }} />);
    
    expect(screen.getByRole('sort-descending')).toBeInTheDocument();
  });

  it('should correctly handle title for empty or undefined fields', () => {
    const incompleteData = [
      { id: 1, percentage: 50 },
    ];
    render(<ProjectTable {...defaultProps} data={incompleteData} />);
    
    const naElements = screen.getAllByText('N/A');
    expect(naElements).toHaveLength(1);
    expect(naElements[0]).toBeInTheDocument();
  });
});
