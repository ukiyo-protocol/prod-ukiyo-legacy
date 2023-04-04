import { Container } from 'react-bootstrap';
import Circle from "../../../../../assets/Images/tokeno.png";
import CommonHeading from '../../../../common/CommonHeading/CommonHeading';
import "./Tokenomics.scss";

const Tokenomics = () => {
    const ListRep = [

        {
            title: "Private-investor sale",
            value: "5%",
            token: "(9-month lock)",
        },
        {
            title: "L-IDO Sale",
            value: "10%",
            token: "(6-month lock)",
        },
        {
            title: "Exchange ",
            value: "15%",
            token: "(centralized and decentralized)",
        },
        {
            title: "Strategic partnerships and advisers",
            value: "4% ",
            token: "",
        },
        {
            title: "Vault",
            value: "5%",
            token: "250M",
        },
        {
            title: "IDO partners",
            value: " 4%",
            token: "",
        },
        {
            title: "Team",
            value: "17% ",
            token: "(2-year lock)",
        },

        {
            title: "Treasury",
            value: "40%",
            token: "R&D, Reserve, Treasury Shares",
        },
    ];
    return (
        <>
            <section className='tokenomics_sec'>
                <Container>
                    <CommonHeading
                        className="comn-heading"
                        title="Tokenomics"
                        subTitle="Tokenomics"
                    />
                </Container>
                <div className="token_sec_inner text-center">
                    <img className="token_sec_img circle-desk" src={Circle} alt="" />
                    {/* <img className="token_sec_img circle-mob" src={CircleMob} alt="" /> */}
                    <ul>
                        {ListRep.map((item, index) => (
                            <li key={`index_${index}`}>
                                <div className="top">
                                    <h6>{item.title}</h6>
                                </div>
                                <div className="d-flex">
                                    <div className="left">
                                        <p>Allocation</p>
                                        <span>{item.value}</span>
                                    </div>
                                    <div className="right">
                                        <p>No. of Tokens</p>
                                        <span>{item.token}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Tokenomics;