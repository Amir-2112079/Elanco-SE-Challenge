import './App.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import NavBar from './Contents/NavBar';
import Applications from './Contents/Applications';
import Resources from './Contents/Resources';
import Raw from './Contents/Raw';
import Footer from './Contents/Footer';




function App() {


  return (

    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/Applications' element={<Applications />} />
          <Route path='/Resources' element={<Resources />} />
          <Route path='/Raw' element={<Raw />} />
        </Routes>

        <Footer />
      </Router>
    </div>


  );
}

export default App;






//This one allows to also view the details 
/*
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationInfo, setApplicationInfo] = useState(null);

  const loadApplications = async () => {
    setIsLoading(true);
    const response = await axios.get('https://engineering-task.elancoapps.com/api/applications');
    setApplications(response.data);
    setIsLoading(false);
  };

  const selectApplication = (application) => {
    setSelectedApplication(application);
  };

  const loadApplicationInfo = async () => {
    setIsLoading(true);
    const response = await axios.get(`https://engineering-task.elancoapps.com/api/applications/${selectedApplication}`);
    setApplicationInfo(response.data);
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Applications</h1>
      <button onClick={loadApplications}>Load Applications</button>
      {isLoading ? <p>Loading...</p> : (
        <ul>
          {applications.map((application) => (
            <li key={application}>{application} <button onClick={() => selectApplication(application)}>View Details</button></li>
          ))}
        </ul>
      )}
      {selectedApplication && (
        <div>
          <h2>{selectedApplication}</h2>
          <button onClick={loadApplicationInfo}>View Details</button>
          {isLoading ? <p>Loading...</p> : applicationInfo ? (
            <pre>{JSON.stringify(applicationInfo, null, 2)}</pre>
          ) : (
            <p>Click "View Details" to load application information.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;




*/



