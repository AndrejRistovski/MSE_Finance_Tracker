import React from "react";
import "./F.A.Q._Page.css";
import {ReactComponent as Plus} from "../images/images_svg/Plus_circle.svg";
import {Link} from "react-router-dom";
import {useState} from "react";

export default function FAQ_Page() {

    const [selected, setSelected] = useState(null);
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    }

    const randomNumber = Math.floor(Math.random() * 45) + 1;
    const randomNumber_1 = randomNumber + 1;
    const randomNumber_2 = randomNumber + 2;
    const randomNumber_3 = randomNumber + 3;
    const randomNumber_4 = randomNumber + 4;

    return (
        <div className="faq_body">
            <div className="faq_accordion">
                <div className="image_box">
                    <img src={require('../images/images_png/questionmarks.png')} className="faq_image"
                         alt="f.a.q._picture"/>
                </div>
                <div className="faq_accordion_text">
                    <div className="faq_title">F.A.Q.</div>
                    <div className="faq_wrapper">
                        <div className="accordion">
                            <div className="faq_item">
                                <div className="faq_Title">
                                    <h2>{questions[randomNumber_1].questionText}</h2>
                                </div>
                                <div className="faq_answer">• {questions[randomNumber_1].answerText}</div>
                            </div>
                            <div className="faq_item">
                                <div className="faq_Title">
                                    <h2>{questions[randomNumber_2].questionText}</h2>
                                </div>
                                <div className="faq_answer">• {questions[randomNumber_2].answerText}</div>
                            </div>
                            <div className="faq_item">
                                <div className="faq_Title">
                                    <h2>{questions[randomNumber_3].questionText}</h2>
                                </div>
                                <div className="faq_answer">• {questions[randomNumber_3].answerText}</div>
                            </div>
                            <div className="faq_item">
                                <div className="faq_Title">
                                    <h2>{questions[randomNumber_4].questionText}</h2>
                                </div>
                                <div className="faq_answer">• {questions[randomNumber_4].answerText}</div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_button_container">
                    <Link to="/" className="Home_button">Home</Link>
                    <Plus className="faq_plus"
                          onClick={() => toggle(randomNumber)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const questions = [
    {
        id: '1',
        questionText: 'What is Bitcoin?',
        answerText: 'Bitcoin is a digital currency which could be purchased, sold, and exchanged between two parties on the internet with high security.',
    },
    {
        id: '2',
        questionText: 'Should I invest in an upcoming IPO?',
        answerText: ' IPOs got public only when everything is good like people are optimistic, the economy is doing wonderful, all in order to get good listing profits.',
    },
    {
        id: '3',
        questionText: 'Who created Bitcoin?',
        answerText: 'Satoshi Nakamoto, introduced the cryptocurrency anonymously through a white paper in 2008',
    },
    {
        id: '4',
        questionText: 'What is crypto mining?',
        answerText: 'Crypto mining involves the use of computers specialized with unique hardware for solving complex algorithmic equations.',
    },
    {
        id: '5',
        questionText: 'Is investing in small caps more profitable than large caps?',
        answerText: 'Small caps companies have the caliber to grow faster compared to large caps.',
    },
    {
        id: '6',
        questionText: 'What is a crypto wallet?',
        answerText: 'In the technical sense, it is a software program that stores a secret number for each crypto address.',
    },
    {
        id: '7',
        questionText: 'Should I use a stop loss on my investments?',
        answerText: 'If you are a trader, then yes!! Stop-loss can help you prevent a lot of damage and you should definitely use it in your traders.',
    },
    {
        id: '8',
        questionText: ' What is a crypto address?',
        answerText: 'The crypto address is the unique identifier that includes almost 26 to 35 alphanumeric characters.',
    },
    {
        id: '9',
        questionText: 'Should I invest in stocks when the market is high?',
        answerText: 'If the market is falling, then it’s the best time to buy.',
    },
    {
        id: '10',
        questionText: 'Which agency takes care of crypto governance?',
        answerText: 'Crypto is basically decentralized digital money, issued and managed without the involvement of any centralized authorities.',
    },
    {
        id: '11',
        questionText: 'What kind of stocks should I avoid?',
        answerText: 'Avoid investing in companies with low liquidity.',
    },
    {
        id: '12',
        questionText: ' What is the reason for fluctuating crypto prices?',
        answerText: 'Crypto prices are fluctuating because of their highly volatile nature and with a limited number of Bitcoins in circulation.',
    },
    {
        id: '13',
        questionText: 'How many stocks should I buy?',
        answerText: 'In general, you should not buy more than 8-10 stocks as it becomes really difficult for a retail investor to monitor more stocks.',
    },
    {
        id: '14',
        questionText: 'What is Blockchain technology?',
        answerText: 'A distributed ledger, which stores transaction details in the form of immutable records which are secured using cryptography',
    },
    {
        id: '15',
        questionText: 'How many returns can I expect from the market?',
        answerText: 'During a good market, your portfolio can give you a return as high as 30-35%',
    },
    {
        id: '16',
        questionText: 'What is Merkel Tree?',
        answerText: 'Merkel Tree is a data structure that is used for verifying a block',
    },
    {
        id: '17',
        questionText: 'Can I become a millionaire by investing in stocks?',
        answerText: 'If you are hoping to make great money from stocks, then be ready to spend serious efforts and plenty of time researching companies',
    },
    {
        id: '18',
        questionText: 'What do you mean by blocks in Blockchain technology?',
        answerText: 'A block is like a record of the transaction. Each time a block is verified, it gets recorded in chronological order in the main Blockchain.',
    },
    {
        id: '19',
        questionText: 'What is a Capital Market?',
        answerText: 'A capital market is a financial market in which long-term debt or equity-backed securities are traded.',
    },
    {
        id: '20',
        questionText: 'What is cryptography?',
        answerText: 'Cryptography is the science of using mathematics to encrypt and decrypt data.',
    },
    {
        id: '21',
        questionText: 'How much time should I spend while researching stocks?',
        answerText: 'It depends on whether the individual is selecting the stock for trading or for long-term investment.',
    },
    {
        id: '22',
        questionText: 'How many Bitcoins are there?',
        answerText: ' On the date of drafting, there exists more than 19 Million Bitcoin. 19,209,755 to be precise.',
    },
    {
        id: '23',
        questionText: 'Where can I get the company’s financial report and other information?',
        answerText: 'The company information is easily available on stocks exchanges (NSE, BSE).',
    },
    {
        id: '24',
        questionText: 'Is all the Bitcoins that are minted in circulation?',
        answerText: 'It is believed that over 4 million BTC have been lost since the first bitcoin was circulated in 2009.',
    },
    {
        id: '25',
        questionText: 'How many Sectors are there to invest in Stock Market?',
        answerText: 'You can invest in 11 different sectors in the stock market.',
    },
    {
        id: '26',
        questionText: 'Which famous celebs own Bitcoin?',
        answerText: 'Famous figures like Elon Musk, Jack Dorsey, Mike Tyson, Snoop Dogg, Lionel Messi, Kayne West, etc.',
    },
    {
        id: '27',
        questionText: 'Is there any time for buying shares or doing a trade?',
        answerText: 'Yes, you can only trade between 09:15 am to 3:30 pm on weekdays, but you can place AMO orders after these trading hours.',
    },
    {
        id: '28',
        questionText: 'What is the highest-ever price of Bitcoin?',
        answerText: 'Bitcoin has touched the mark of 68,789.63 USD, which is the highest of all time for any cryptocurrency.',
    },
    {
        id: '29',
        questionText: 'Is it safe to invest in Unlisted Stocks as a beginner?',
        answerText: 'If your firm about the future growth of the company only then you can think of investing in unlisted stocks.',
    },
    {
        id: '30',
        questionText: 'Where can one buy Bitcoin?',
        answerText: 'Anyone can buy Bitcoin from a centralised crypto exchange, or P2P.',
    },
    {
        id: '31',
        questionText: 'How to Find Undervalued Stocks?',
        answerText: 'Investors find these stocks using fundamental and technical analysis.',
    },
    {
        id: '32',
        questionText: 'What share of bitcoin is lost?',
        answerText: 'It is estimated that around 20% of Bitcoin would be permanently lost.',
    },
    {
        id: '33',
        questionText: 'Should I use a stop-loss on my investments?',
        answerText: ' If you are an active trader, you can use stop-loss to control a lot of stocks.',
    },
    {
        id: '34',
        questionText: 'How many Bitcoins are released daily?',
        answerText: 'Around 900 Bitcoins are released into circulation daily.',
    },
    {
        id: '35',
        questionText: 'What Time Does The Stock Market Open?',
        answerText: 'The regular trading hours for the U.S. stock market are from 9.30 a.m. to 4 p.m.',
    },
    {
        id: '36',
        questionText: 'What is the famous “2 pizzas for 300 Million dollars”’ story?',
        answerText: ' in 2010, a Bitcoin user bought 2 large pizzas for 10,000 BTC. Those Bitcoin would have cost more than 300 Million USD.',
    },
    {
        id: '37',
        questionText: 'Is The Stock Market Open On Weekends?',
        answerText: 'There are no regular trading hours for stocks on Saturdays or Sundays.',
    },
    {
        id: '38',
        questionText: 'Where is BTC mined the most?',
        answerText: 'Countries like the United States of America, China, Canada, Russia, Kazakhstan, Germany, Malaysia, etc.',
    },
    {
        id: '39',
        questionText: 'What are Stock Futures?',
        answerText: 'Futures refer to a contract that stipulates the buying/selling of a specified commodity for a certain price at a specific point in time.',
    },
    {
        id: '40',
        questionText: 'What is the smallest unit of a Bitcoin?',
        answerText: 'A bitcoin is divisible into 100 Million parts, each is called one satoshi. 1 sat is equal to 0.0000001 BTC.',
    },
    {
        id: '41',
        questionText: 'What Caused The Stock Market Crash Of 1929?',
        answerText: 'The crash began on October 24, 1929, known as “Black Thursday”, when the market opened 11% lower.',
    },
    {
        id: '42',
        questionText: 'When is the next Bitcoin halving expected?',
        answerText: 'The next halving is expected between Feb and June 2024, when the reward will decrease to 3.125 BTC per block.',
    },
    {
        id: '43',
        questionText: 'What was the Great Depression?',
        answerText: 'It was the deepest and longest-lasting economic downturn in the history of the Western Industrialized world up to that time.',
    },
    {
        id: '44',
        questionText: 'Name some Bitcoin Stocks.',
        answerText: 'A few of the top stocks of Bitcoins are MicroStrategy Inc., Block Inc., PayPal Holdings Inc., etc.',
    },
    {
        id: '45',
        questionText: 'What is a limit order in Stocks?',
        answerText: 'A limit order in stocks is an order to buy or sell a security at a specified price or better.',
    },
    {
        id: '46',
        questionText: 'Where is Bitcoin a government legal tender?',
        answerText: 'Central African Republic and El Salvador have accepted Bitcoin as Legal Tender.',
    },
    {
        id: '47',
        questionText: 'What is a Put in Stocks?',
        answerText: 'A put in stocks is an options contract that represents the right to sell a particular stock at a set price.',
    },
    {
        id: '48',
        questionText: 'What are the various types of Blockchains?',
        answerText: 'Public, Private & Consortium',
    },
    {
        id: '49',
        questionText: 'What is a wash sale in stocks?',
        answerText: 'A wash sale is a sale of a security stock at a loss, followed by another purchase within 30 days.',
    },
    {
        id: '50',
        questionText: 'Is it possible to switch the data once it’s written in an exceeding block?',
        answerText: 'No, it’s impossible to do so.',
    },
];