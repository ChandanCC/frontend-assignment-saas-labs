import React from "react";
import "./ProjectTable.css";
import { RiRefreshLine, RiArrowUpSLine, RiArrowDownSLine } from "@remixicon/react";

const ProjectTable = ({ data, loading, hideCaption, caption, columns, rowKeyPath, onTableDataChange, sortConfig }) => {
  const handleSort = (key) => {
    const newDirection = 
      sortConfig?.key === key && sortConfig?.direction === 'asc'
        ? 'desc'
        : 'asc';

    onTableDataChange(key, newDirection);
  };

  return (
    <table className="project-table">
      <caption className={hideCaption ? "visually-hidden" : ""}>{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th 
              scope="col" 
              key={column.key}
              onClick={() => column.sorter && handleSort(column.key)}
              style={{ cursor: column.sorter ? 'pointer' : 'default' }}
              aria-sort={
                column.sorter && sortConfig?.key === column.key 
                  ? sortConfig.direction === 'asc' 
                    ? 'ascending' 
                    : 'descending'
                  : 'none'
              }
            >
              {column.title}
              {column.sorter && sortConfig?.key === column.key && (
                sortConfig.direction === 'asc' 
                  ? <RiArrowUpSLine 
                      role="sort-ascending"
                      aria-label={`Sorted ascending by ${column.title}`}
                      size={16}
                      className="sort-icon"
                    />
                  : <RiArrowDownSLine 
                      role="sort-descending"
                      aria-label={`Sorted descending by ${column.title}`}
                      className="sort-icon"
                      size={16}
                    />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={`project-table-body`}>
        {loading ? (
          <tr>
            <td colSpan={columns.length} className="no-data">
              <div className="project-table-loading">
                <RiRefreshLine size={40} data-testid="loading-spinner"/>
                <span role="status">Loading...</span>
              </div>
            </td>
          </tr>
        ) : data.length > 0 ? (
          data.map((project) => (
            <tr key={project[rowKeyPath]}>
              {columns.map((column) => (
                <td key={`${project[rowKeyPath]}_${column.key}`} title={project[column.key] ?? "N/A"}>
                  {project[column.key] ?? "N/A"}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="no-data" role="status">
              No projects to display.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProjectTable;
