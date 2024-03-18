import React from 'react';
import Navbar from '../components/Navbar';

const SplitBackgroundPage = () => {
    return (
        <>
            <Navbar />
            <div className="split-background">
                <div className="top-half"></div>
                <div className="bottom-half"></div>
            </div>
            <style jsx>{`
                .split-background {
                    display: flex;
                    flex-direction: column;
                    z-index=1;
                }
                .top-half {
                    flex: 1;
                    background-color: #1D80A7;
                    min-height: calc(50vh + 50px);
                }
                .bottom-half {
                    flex: 1;
                    background-color: #EDF8FD;
                    min-height: calc(50vh - 50px);
                }
            `}</style>
        </>
    );
}

export default SplitBackgroundPage;
