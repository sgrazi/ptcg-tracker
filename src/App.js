import { invokeLambda, invokeLambdaWBody } from './logic/LambdaInvoker';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import MainView from './components/MainView';
import AWS from 'aws-sdk';
import './App.css';

const overlay = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: '850',
}

function App() {
  AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION,
    credentials: new AWS.Credentials(
      process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    )
  });

  const [cards, setCards] = useState([]);
  const [deleteCardConfirm, setDeleteCardConfirm] = useState(false);
  const [cardIdToDelete, setCardIdToDelete] = useState(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [existingCategories, setExistingCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await invokeLambda("GetCategory");
      if (response && response.StatusCode === 200) {
        setExistingCategories(JSON.parse(JSON.parse(response.Payload)));
      }
    }
    fetchCategories();
    handleSearch("");
  }, []);

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm)
    const response = await invokeLambdaWBody("GetCard", {"search_query": searchTerm});
    const jsonResponse = JSON.parse(response)
    setCards(jsonResponse["items"]);
    setTotalPages(Math.ceil(jsonResponse["total_count"] / 20))
  };

  const handleFilterByCategory = async (cat_id) => {
    setSearchTerm("")
    const response = await invokeLambdaWBody("GetCard", {"category_query": cat_id});
    const jsonResponse = JSON.parse(response)
    setCards(jsonResponse["items"]);
    setTotalPages(Math.ceil(jsonResponse["total_count"] / 20))
  };
  
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const fetchCards = async () => {
      const response = await invokeLambdaWBody("GetCard", {
        "search_query": searchTerm,
        "page": currentPage
      });
      const jsonResponse = JSON.parse(response);
      setCards(jsonResponse["items"]);
    };
    fetchCards();
  }, [currentPage]);

  const deleteCard = async (cardId) => {
    if (deleteCardConfirm) {
      await invokeLambdaWBody("DeleteCard", {body: {"id": cardId}});
      const updatedCards = cards.filter((card) => card.card_id !== cardId);
      setCards(updatedCards);
      setCardIdToDelete(undefined);
      setDeleteCardConfirm(false);
    } else {
      setCardIdToDelete(cardId)
      setDeleteCardConfirm(true);
    }
  };

  return (
    <div className="app">
      <img src="/logo.png" alt="Website Logo" className="logo" />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} existingCategories={existingCategories}/>
      {isSidebarOpen && <div style={overlay} onClick={()=>setIsSidebarOpen(false)} />}
      <Search searchCallback={handleSearch} />
      {deleteCardConfirm && <>
        <button style={deleteButtonStyle} onClick={() => deleteCard(cardIdToDelete)}>Borrar</button>
        <button style={cancelButtonStyle} onClick={() => setDeleteCardConfirm(false)}>NO borrar</button>
      </>}
      <MainView cards={cards} search={handleFilterByCategory} onDeleteCard={deleteCard} existingCategories={existingCategories}/>
      <div style={paginationStyle}>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

const deleteButtonStyle = {
  width: '90%',
  padding: '10px 20px',
  backgroundColor: '#d6513c',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const cancelButtonStyle = {
  width: '90%',
  padding: '10px 20px',
  backgroundColor: '#77d63c',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const paginationStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
};

export default App;
