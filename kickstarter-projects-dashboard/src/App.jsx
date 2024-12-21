import React, { useEffect, useState } from "react";
import ProjectTable from "./components/ProjectTable/ProjectTable";
import Pagination from "./components/Pagination/Pagination";
import "./App.css";

const columns = [
  {
    title: "S.No",
    key: "s.no",
    sorter: true,
  },
  {
    title: "Percentage funded",
    key: "percentage.funded", 
    sorter: true,
  },
  {
    title: "Amount pledged",
    key: "amt.pledged",
    sorter: true,
  },
];

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "s.no", direction: "asc" });
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const sortedProjects = React.useMemo(() => {
    let sortableProjects = [...projects];
    if (sortConfig !== null) {
      sortableProjects.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProjects;
  }, [projects, sortConfig]);

  const totalPages = Math.ceil(projects.length / recordsPerPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTableDataChange = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const currentProjects = sortedProjects.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <section className="app-container">
      <h1>Kickstarter Projects</h1>
      <ProjectTable
        data={currentProjects}
        loading={loading}
        rowKeyPath={"s.no"}
        columns={columns}
        hideCaption
        caption={"Kickstarter Project Details"}
        onTableDataChange={handleTableDataChange}
        sortConfig={sortConfig}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  );
};

export default App;
