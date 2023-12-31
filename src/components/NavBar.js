import { useState, useEffect } from 'react';
import { Navbar,Nav, Container } from 'react-bootstrap';
import logo from '../assets/img/logo.svg'
import navIcon1 from '../assets/img/nav-icon1.svg'
import navIcon2 from '../assets/img/nav-icon2.svg'
import navIcon3 from '../assets/img/nav-icon3.svg'


export const NavBar = () => {

    const [activeLink, setActiveLink] = useState('home')
    const [scrolled, seScrolled] = useState (false); //I need to detect when the user changes the color of the background

    useEffect (()=> {
        const onScroll =() =>{
            if (window.scrollY >50) {
                seScrolled(true);
            }else {
              seScrolled(false)
            };
        }

        window.addEventListener("scroll", onScroll)

        return () => window.removeEventListener("scroll", onScroll); // added evetlistener on mount, so must have to remove when the component gets removed form the dom
    }, [])

    const onUpdateActiveLink = (value) => {
      setActiveLink(value);
    }

    return (     
    <Navbar expand="lg" className= { scrolled ? "scrolled": ""}>
      <Container>
        <Navbar.Brand href="#home" >
            <img src ={logo}alt = 'Logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" > 
        <span class="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className={ activeLink === 'home' ? 'active navbar-link': 'navbar-link'} onClick={ ()=> onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#skills" className={ activeLink === 'skills' ? 'active navbar-link': 'navbar-link'} onClick={ ()=> onUpdateActiveLink('skills')}>Skills</Nav.Link>
            <Nav.Link href="#projects" className={ activeLink === 'projects' ? 'active navbar-link': 'navbar-link'}onClick={ ()=> onUpdateActiveLink('projects')}>Projects</Nav.Link>
          </Nav>
          <span className = "navbar-text">
                    <div className="social-icon">
                        <a href="https://www.linkedin.com/in/yessica-pineda-guerra/"><img src ={navIcon1} alt = "" /> </a>
                        <a href="https://www.google.com/"><img src ={navIcon2} alt = "" /> </a>
                        <a href="https://www.google.com/"><img src ={navIcon3} alt = "" /> </a>
                    </div>
                    <button className="vvd" onClick={() => console.log('connect')}><span> Let's Connect</span> </button>

            </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


