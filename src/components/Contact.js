import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg"
export const Contact = () => {
    const formInitialDetails ={
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    }
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [ buttonText, setButtonText] = useState('send');
    const [ status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); //I dont want the page get reload
        setButtonText('Sending...') //hte user just need to wait
        let response = await fetch ("htttp://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json; charset=utf-8",
            },
            body: JSON.stringify(formDetails), //formdetails ir my object       
    });
    setButtonText("send");
    let result = response.json();
    setFormDetails(formInitialDetails);//we want to clear the form
        if (result.code ===200) { //response back, succesfull api call
            setStatus({succes: true, message: 'Message sent succesfully'});
        }else {
            setStatus({succes: false, message: 'Something went wrong, please try again later'})
        }

    }

    return(
        <section className="contact" id= "connect">
            <Container>
                <Row className= "align-items-center">
                    <Col md={6}>
                        <img src={contactImg} alt="Contact Me"/>
                    </Col>
                    <Col md={6}>
                        <h2> Get in Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input type ="text" value={formDetails.firstName} placeholder="First Name"onChange ={(e) => onFormUpdate ('firstName', e.target.value) }/> 
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type ="text" value={formDetails.lastName} placeholder="Last Name"onChange ={(e) => onFormUpdate ('lastName', e.target.value) }/> 
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type ="email" value={formDetails.email} placeholder="Email Address"onChange ={(e) => onFormUpdate ('email', e.target.value) }/> 
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type ="telephone" value={formDetails.lastName} placeholder="Phone Number"onChange ={(e) => onFormUpdate ('phone', e.target.value) }/> 
                                </Col>
                                <Col>
                                <textarea rows="6" value={formDetails.message} placeholder="Message" onChange ={(e) => onFormUpdate ('message', e.target.value) }> </textarea>
                                <button type="submit" ><span>{buttonText}</span></button>
                                </Col>
                                {
                                    status.message &&
                                    <Col>
                                     <p className={status.success === false ? "danger": "success"}> {status.message}</p>
                                    </Col>
                                }
                            </Row>
                        </form>

                    </Col>
                </Row>
            </Container>

        </section>

    )

}