import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forms from './components/Forms'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hyderabad MMTS Booking</h1> <br/> <br/>
        <Forms/>
      </header>
    </div>
  );
}

export default App;
