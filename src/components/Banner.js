import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg"

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);/*loop indicate the current word displaying on the screen*/
    const [isDeleting, setIsDeleting] = useState(false) /*the word being typed out or being deleted, start in false because I initially type the word*/
    const toRotate = ["Web Developer", "Web Designer", "Biomedical Engineer"];
    const [text, setText] = useState(''); /*the component needs to know what text is showing right now, indicates the portion of the wrd that is being displayed*/
    const [delta, setDelta] = useState(300 - Math.random()*100); /*delta to determiniate how fast one letter comes after the first one is typed*/ 
    const period = 2000; /*arbirtraily indicate how much time passes betwwen one extra letter being typed out*/
    
    useEffect(() => { /*function responsible for taking care of typing and deleting*/
        let ticker = setInterval(() => { /*the interval where the text would get updated*/
            tick();
        }, delta) /*delta will b the interval whn the tick is getting fired off*/

        return () => { clearInterval(ticker) };
    }, [text])/* the useeffect we want it to run every time the text gets updated*/ 

    const tick = () => {
        let i = loopNum % toRotate.length; /*i is the index from the array were currently peaking, the reason is loop number is constantly increasing*/
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring (0, text.length -1) : fullText.substring(0, text.length +1);

        setText (updatedText);

        if (isDeleting){
            setDelta(prevDelta => prevDelta /2)
        }

        if (!isDeleting && updatedText === fullText) { /*finish typing out then*/
            setIsDeleting(true) /*start to deleting the word*/
            setDelta(period) /*waiting to deleting the text*/
        } else if (isDeleting && updatedText === '') { //deleting the current word, its time to the next word
            setIsDeleting(false); //is false, to indicate the deleted process is completed
            setLoopNum(loopNum + 1); //I add one, to pass to the next word from my array toRotate
            setDelta(500); //waitint to begin to writting the next word
        }
    }

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to my portfolio</span>
                        <h1>{`Hi I'm Yessica Pineda  `}<span className="wrap">{text}</span></h1>
                        <p>Passionate junior Software Developer with a back ground in Biomedical Engineering. Fascinated by the diverse possibilities of software development applications.</p>
                        <button onClick={() => console.log('connect')}> Let's connect <ArrowRightCircle size={24} /> </button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img" />
                    </Col>

                </Row>
            </Container>
        </section >
    )
}