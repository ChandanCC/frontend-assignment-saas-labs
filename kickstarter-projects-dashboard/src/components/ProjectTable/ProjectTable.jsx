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
        <tr className={`project-table-loading ${loading && "visible"}`}>
          <RiRefreshLine size={40} />
          <span>Loading...</span>
        </tr>
        {data.length > 0 ? (
          data.map((project) => {
            return (
              <tr key={project[rowKeyPath]}>
                {columns.map((column) => (
                  <td key={`${project[rowKeyPath]}_${column.key}`} title={project[column.key] ?? "N/A"}>
                    {project[column.key] ?? "N/A"}
                  </td>
                ))}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={columns.length ?? 3} className="no-data">
              No projects to display.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProjectTable;
