import React, { useEffect, useState } from "react";
import ProjectTable from "./components/ProjectTable/ProjectTable";
import Pagination from "./components/Pagination/Pagination";
import "./App.css";

const columns = [
  {
    title: "S.No",
    key: "s.no",
  },
  {
    title: "Percentage funded",
    key: "percentage.funded",
  },
  {
    title: "Amount pledged",
    key: "amt.pledged",
  },
];

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
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

  const totalPages = Math.ceil(projects.length / recordsPerPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const currentProjects = projects.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

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
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  );
};

export default App;
