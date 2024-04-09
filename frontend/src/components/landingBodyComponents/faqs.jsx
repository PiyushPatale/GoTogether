/* FAQs component in landing page */
import React, { Component , useState }  from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

export default class Faqs extends Component {
    render() {
        return (
            <section className="section-item">
                <div>
                    <h2>FAQs</h2>
                    <Accordion style={{ marginTop: '7vh' }}>
                        <AccordionCustom  question="How does the booking process work?" answer="To book a trip, simply log in to your account and enter your desired destination in the search bar!" />
                        <AccordionCustom  question="What safety measures are in place for passengers and drivers?" answer="Our drivers undergo thorough background checks and their vehicles are inspected to ensure they meet safety standards. Additionally, we provide comprehensive insurance coverage for every trip. !" />
                        <AccordionCustom  question="Can I cancel or modify my booking?" answer="Yes, you can cancel or modify your booking. Simply navigate to your booking details in your account dashboard and follow the prompts to cancel or modify your trip!" />
                        <AccordionCustom  question="What if I can't find a trip to my desired destination?" answer="If you can't find a trip to your desired destination, you can submit a trip request specifying your destination, preferred departure time, and any other relevant details" />
                        <AccordionCustom  question="Can I smoke in your cars?" answer="Smoking is prohibited and will result in a penalty if found guilty." />
                    </Accordion>
                </div>
            </section>
        );
    }
}

function AccordionCustom(props) {
    // FAQ render element
    const { question, answer } = props
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Card style={{ marginBottom: '3vh' , cursor:'pointer' }} onClick={() => setIsOpen(!isOpen)}>
            <Card.Header >
                <Accordion>
                    {question}
                </Accordion>
            </Card.Header>
            <Accordion.Collapse in={isOpen}>
                <Card.Body style={{backgroundColor:'##ffffff', padding:'15px', borderRadius:'20px'}}>{answer}</Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}
