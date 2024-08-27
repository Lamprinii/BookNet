
import './App.css';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Library from './Components/Library.jsx';
import Signup from './Components/Signup.jsx';
import Footer from './Components/Footer.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container.js';
import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import Menubar from './Components/menubar.jsx';
import BookCard from './Components/BookCard.jsx' 
import { Link } from 'react-router-dom';
import { useState , createContext,useEffect,useRef } from 'react';
import BookPage from './Components/BookPage.jsx';
import ContactUs from './Components/ContactUs.jsx';
import BookingPage from './Components/BookingPage.jsx';
import AddBook from './Components/AddBook.jsx';
import MyBookings from './Components/my-bookings/MyBookings.jsx';
import AdminPanelBooks from './Components/admin-panel/AdminPanelBooks.jsx';
import AdminPanelUsers from './Components/admin-panel/AdminPanelUsers.jsx';
import AdminPanelBookings from './Components/admin-panel/AdminPanelBookings.jsx';
import BookingConfirmationPage from './Components/BookingConfirmationPage.jsx'
import PageNotFound from './Components/PageNotFound.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import refreshPageService from './services/refresh.page.service.js';

import ProtectedRoute from './Components/ProtectedRoute.jsx';
export const UserContext = createContext();

function App() {

  const [userIcon,setUserIcon]=useState("")
  const [firstName,setFirstName]=useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);
  const [isInspector,setIsInspector] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const hasRun = useRef(false);


  useEffect(() => {
    setIsLoading(true);
    if(!hasRun.current){
      if(refreshPageService.getReload() === 'true'){
        hasRun.current = true;

       refreshPageService.onPageLoad()
        .then((localUser) => {
          if (localUser != null) {
            setUser(localUser);
            setIsLoggedIn(refreshPageService.getIsLoggedIn());
            setUserIcon("https://ik.imagekit.io/cineticketbooking/Users/" + localUser.id + ".jpeg");
            setFirstName(localUser.firstName);
          }
        }).catch((error) => {
          // Handle any errors during fetching
          console.error("Error fetching localUser:", error);
        })
        .finally(() => {
          console.log("user: ",user);
          setIsLoading(false);
        });
        
      }
      refreshPageService.setReload(true);
      
    }
    
  }, []);

  useEffect(() => {
    if(user != ""){
      refreshPageService.onPageRefresh(isLoggedIn,user.id);
    }
  },[isLoggedIn,user])

  return (
    <div className="App p-1" > 
      
      <UserContext.Provider 
        value={{isLoggedIn, setIsLoggedIn, user, setUser,isAdmin,setIsAdmin,
                isInspector,setIsInspector,userIcon,setUserIcon,firstName,setFirstName}
              }>

      <div className="content-container">
        <Router>
        <header className="sticky-header">
          <Menubar  icon={userIcon} username={firstName}/>
        </header>
          <Routes> 
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route exact path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/book" element={<BookPage/>}></Route>       
              <Route path="/booking-confirmation" element={<BookingConfirmationPage/>}></Route>

              <Route path="*" element={<PageNotFound />} />

              {/* Protected Routes */}
              
              <Route path="/books" 
                element={
                  <ProtectedRoute isLoading={isLoading} isAuthenticated={isLoggedIn} hasPermission={true}>
                    <Library/>
                  </ProtectedRoute>
              }/>

              <Route path="/booking" 
                element={
                  <ProtectedRoute isLoading={isLoading} isAuthenticated={isLoggedIn} hasPermission={true}>
                    <BookingPage/>
                  </ProtectedRoute>
              }/>

              <Route path="/addbook" 
                element={
                  <ProtectedRoute isLoading={isLoading} isAuthenticated={isLoggedIn} hasPermission={isAdmin}>
                    <AddBook/>
                  </ProtectedRoute>
              }/>

              <Route path="/admin-panel/books" 
                element={
                  <ProtectedRoute isLoading={isLoading} isAuthenticated={isLoggedIn} hasPermission={isAdmin}>
                    <AdminPanelBooks/>
                  </ProtectedRoute>
              }/>
          
              <Route path="/admin-panel/books" 
                element={
                  <ProtectedRoute isLoading={isLoading} isAuthenticated={isLoggedIn} hasPermission={isAdmin}>
                    <AdminPanelBooks/>
                  </ProtectedRoute>
              }/>

            <Route path="/admin-panel/bookings" 
                element={
                  <ProtectedRoute isLoading={isLoading} isAuthenticated={isLoggedIn} hasPermission={isAdmin}>
                    <AdminPanelBookings/>
                  </ProtectedRoute>
              }/> 

              <Route path="/admin-panel/users" 
                element={
                  <ProtectedRoute isLoading={isLoading} isAuthenticated={isLoggedIn} hasPermission={isAdmin}>
                    <AdminPanelUsers/>
                  </ProtectedRoute>
              }/>


              <Route path="/my-bookings" 
                element={
                  <ProtectedRoute isLoading= {isLoading} isLoggedIn={isLoggedIn} hasPermission={true}>
                    <MyBookings/>
                  </ProtectedRoute>
                }
              />   
          </Routes>
          <Footer></Footer>
        </Router>
        
      </div>
      
      </UserContext.Provider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
    </div>
  );
}

export default App;
