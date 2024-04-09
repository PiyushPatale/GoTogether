import React from 'react';

const AboutUs = () => {
    return (
        <div className="about-us" style={{
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            padding: '20px'
        }}>
            <h1 className="title" style={{
                color: 'navy',
                fontSize: '32px',
                marginBottom: '20px'
            }}>Our Team</h1>
            <div className="team-members" style={{
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <div className="team-member" style={{
                    flex: '0 1 30%',
                    margin: '10px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <img src={require("../assets/person1.jpeg")} alt="Person 1" className="person-photo" style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        marginBottom: '10px',
                    }} />
                    <h2 className="person-name" style={{ color: 'navy' }}>Piyush Pranav</h2>
                    <p className="person-description">2101145</p>
                </div>
                <div className="team-member" style={{
                    flex: '0 1 30%',
                    margin: '10px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <img src={require("../assets/person2.jpeg")} alt="Person 1" className="person-photo" style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        marginBottom: '10px'
                    }} />
                    <h2 className="person-name" style={{ color: 'navy' }}>Piyush Patale</h2>
                    <p className="person-description">2101141</p>
                </div>
                <div className="team-member" style={{
                    flex: '0 1 30%',
                    margin: '10px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <img src={require("../assets/person3.jpeg")} alt="Person 1" className="person-photo" style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        marginBottom: '10px'
                    }} />
                    <h2 className="person-name" style={{ color: 'navy' }}>Sankalp Jha</h2>
                    <p className="person-description">2101182</p>
                </div>
                {/* Additional team members with similar structure */}
            </div>
        </div>
    );
}

export default AboutUs;
