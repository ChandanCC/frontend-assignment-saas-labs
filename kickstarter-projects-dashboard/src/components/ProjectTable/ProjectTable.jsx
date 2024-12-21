import React from "react";
import "./ProjectTable.css";
import { RiRefreshLine } from "@remixicon/react";

const ProjectTable = ({ data, loading, hideCaption, caption, columns, rowKeyPath }) => {
  return (
    <table className="project-table">
      <caption className={hideCaption ? "visually-hidden" : ""}>{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th scope="col" key={column.key}>
              {column.title}
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
